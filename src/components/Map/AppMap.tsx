import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import "./AppMap.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MultiPolygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON.js";
import { FullScreen, defaults as defaultControls } from "ol/control.js";
import { Vector as VectorLayer } from "ol/layer.js";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import { OSM, Stamen, Vector as VectorSource } from "ol/source.js";
import regionsData from "../../assets/geo/kz_regions.json";
import fieldsData from "../../assets/geo/fields.json";
import { getCenter } from "ol/extent";
import { regionNames } from "../Regions/Regions";
import Stroke from "ol/style/Stroke";
import { useSelector } from "react-redux";
import { BigNumberState } from "../BigNumbers/bigNumbersSlice";
import { toStringHDMS } from "ol/coordinate";
import Overlay from "ol/Overlay";
import { Popover } from "react-bootstrap";
import { RootState } from "../../../store";
import { normalize } from "ol/color";
import { getVectorContext } from "ol/render";

const regionsStyle = new Style({
  fill: new Fill({
    color: "#000000",
  }),
});
const fieldsStyle = new Style({
  fill: new Fill({
    color: "#eeeeee",
  }),
});
const format = new GeoJSON();
const regionsFeatures = format.readFeatures(regionsData);
const fieldsFeatures = format.readFeatures(fieldsData).filter((feature) => {
  return feature.values_?.type === "добыча";
});
const numberToLayerType = {
  0: "нефть",
  1: "газ",
};
const getFieldsLayer = (bigNumberValue) => {
  const currentType = numberToLayerType["" + bigNumberValue];
  if (currentType) {
    const featuresToDisplay = fieldsFeatures.filter((field) =>
      String(field.values_?.field_resources).includes(currentType),
    );
    return new VectorLayer({
      source: new VectorSource({
        features: featuresToDisplay,
      }),
      zIndex: 1,

      style: function (feature) {
        fieldsStyle.getFill().setColor("#000");
        return fieldsStyle;
      },
    });
  }
};

interface AppMapProps {
  currentRegion: string;
}

const AppMap = ({ currentRegion }: AppMapProps) => {
  const bigNumberValue = useSelector(
    (state: RootState) => state.bigNumbers.value,
  );
  const regionNameToColor = {};
  // "#FF00FF", // Neon Magenta
  //"#00A6ED", // Electric Blue
  const colors = [
    "#FFC300", // Cyber Yellow
    "#3B82F6", // Neon Blue
    "#FF6D00", // Hyper Orange
    "#BADA55", // Hi-Tech Green
    "#FF3131",
  ];
  for (let i = 0; i < Object.keys(regionNames).length; i++) {
    regionNameToColor[regionNames[Object.keys(regionNames)[i]]] = colors[i % colors.length];
  }
  const popupRef = useRef(null);
  const [zoom, setZoom] = useState(5);
  const [mapCenter, setMapCenter] = useState([
    7347086.392356056, 6106854.834885074,
  ]);
  const view = useMemo(
    () => new View({ center: mapCenter, zoom: zoom }),
    [mapCenter, zoom],
  );

  const flyTo = useCallback(
    (location, done) => {
      const duration = 500;
      let parts = 2;
      let called = false;
      function callback(complete) {
        --parts;
        if (called) {
          return;
        }
        if (parts === 0 || !complete) {
          called = true;
          done(complete);
        }
      }
      view.animate(
        {
          center: location,
          duration: duration,
          zoom: 6,
        },
        callback,
      );
      view.animate(
        {
          zoom: zoom - 1,
          duration: duration / 2,
        },
        {
          zoom: zoom,
          duration: duration / 2,
        },
        callback,
      );
    },
    [view, zoom],
  );

  const regionsLayer = useMemo(
    () =>
      new VectorLayer({
        source: new VectorSource({
          features: regionsFeatures,
        }),
        opacity: 0.6,
        zIndex: 1,
        style: function (feature) {
          const color = regionNameToColor[feature.values_.name_ru];
          regionsStyle.getFill().setColor(color);
          return regionsStyle;
        },
      }),
    [],
  );

  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  const lastIdRef = useRef<number>(-1);

  const [popupText, setPopupText] = useState(null);
  const [popupVisibility, setpopupVisibility] = useState(false);

  const fieldsLayerRef = useRef(null);
  useEffect(() => {
    const background = new TileLayer({
      className: "stamen",
      source: new Stamen({
        layer: "toner",
      }),
    });

    const base = new TileLayer({
      source: new OSM(),
    });

    const clipLayer = regionsLayer;

    //Giving the clipped layer an extent is necessary to avoid rendering when the feature is outside the viewport
    clipLayer.getSource().on("addfeature", function () {
      base.setExtent(clipLayer.getSource().getExtent());
    });

    const style = new Style({
      fill: new Fill({
        color: "black",
      }),
    });

    base.on("postrender", function (e) {
      const polygons = [];
      clipLayer.getSource().forEachFeature(function (feature) {
        const name = feature.get("name");

        const geometry = feature.getGeometry();

        const type = geometry.getType();
        if (type === "Polygon") {
          polygons.push(geometry);
        } else if (type === "MultiPolygon") {
          Array.prototype.push.apply(polygons, geometry.getPolygons());
        }
      });
      const multiPolygon = new MultiPolygon([]);
      polygons.forEach(function (polygon) {
        multiPolygon.appendPolygon(polygon);
      });

      e.context.globalCompositeOperation = "destination-in";
      const vectorContext = getVectorContext(e);
      vectorContext.setStyle(style);
      vectorContext.drawGeometry(multiPolygon);

      e.context.globalCompositeOperation = "source-over";
    });

    const mapLayers = [clipLayer, base];

    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        controls: defaultControls({ attribution: false }).extend([
          new FullScreen(),
        ]),
        layers: mapLayers,
        view: view,
        target: ref.current,
      });

      const popup = new Overlay({
        element: document.getElementById("popup"),
      });
      mapRef.current.addOverlay(popup);

      // Showing place features when the user hovers

      const selectStyle = new Style({
        fill: new Fill({
          color: "#eeeeee",
        }),
        stroke: new Stroke({
          color: "rgba(255, 255, 255, 0.7)",
          width: 2,
        }),
      });

      let selected = null;
      mapRef.current.on("pointermove", function (e) {
        if (selected !== null) {
          selected.setStyle(undefined);
          selected = null;
        }
        setpopupVisibility(false);
        mapRef.current.forEachFeatureAtPixel(e.pixel, function (f) {
          if (f.values_.type !== "district") {
            setpopupVisibility(true);
          }
          if (
            f.values_.type !== "district" &&
            lastIdRef.current !== f.values_.id
          ) {
            popup.setPosition(e.coordinate);
            setPopupText({
              Имя: f.values_.name,
              Оператор: f.values_.operator_name,
              Добыча: f.values_.field_resources,
            });
            lastIdRef.current = f.values_.id;
          }
          selected = f;
          selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
          f.setStyle(selectStyle);

          return true;
        });
      });
    }
    const newFieldsLayer = getFieldsLayer(bigNumberValue);
    if (newFieldsLayer) {
      if (fieldsLayerRef.current) {
        // If the fieldsLayer already exists, remove it from the map first
        mapRef.current.removeLayer(fieldsLayerRef.current);
      }
      fieldsLayerRef.current = newFieldsLayer;
      mapRef.current.addLayer(newFieldsLayer);
    }
  }, [ref, mapRef, mapCenter, zoom, regionsLayer, bigNumberValue, view]);

  useEffect(() => {
    if (currentRegion) {
      const feature = regionsFeatures.filter(
        (feature) => feature.values_.name_ru === currentRegion,
      )[0];
      //.filter(feature => feature.values_.name_ru === currentRegion)
      const extent = feature.getGeometry().getExtent();
      const center = getCenter(extent);

      // Call the flyTo function when currentRegion changes
      flyTo(center, () => {});
    }
  }, [currentRegion]);

  const getPopupText = (popupText) => {
    const arr = [];
    for (const popupTextItem in popupText) {
      const formattedElement = `${popupTextItem}: ${popupText[popupTextItem]}`;

      // Step 4: Store each formatted string in an array
      arr.push(formattedElement);
    }
    return arr;
  };

  return (
    <>
      <div ref={ref} id="map" />
      <div
        id="popup"
        ref={popupRef}
        className={popupVisibility ? "" : "hidden"}
      >
        {getPopupText(popupText).map((str) => (
          <p key={str}>{str}</p>
        ))}
      </div>
    </>
  );
};

export default AppMap;

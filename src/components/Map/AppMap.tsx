import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import "./AppMap.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Circle, Geometry, MultiPolygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON.js";
import { FullScreen, defaults as defaultControls } from "ol/control.js";
import { Vector as VectorLayer } from "ol/layer.js";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import { OSM, Stamen, Vector as VectorSource } from "ol/source.js";
import regionsData from "../../assets/geo/kz_regions.json";
import fieldsData from "../../assets/geo/fields.json";
import factoriesData from "../../assets/geo/factories.json";
import plantsData from "../../assets/geo/power_plants.json";
import oilPipelinesData from "../../assets/geo/oil_pipelines.json";
import transmissionLinesData from "../../assets/geo/transmission_lines.json";
import gasPipelinesData from "../../assets/geo/gas_pipelines.json";
import { getCenter } from "ol/extent";
import { regionNames } from "../Regions/Regions";
import Stroke from "ol/style/Stroke";
import { useSelector } from "react-redux";
import Overlay from "ol/Overlay";
import { RootState } from "../../../store";
import { getVectorContext } from "ol/render";
import { Feature } from "ol";
import { Circle as CircleStyle } from "ol/style.js";
import { Category } from "../CategoriesMenu/categoriesSlice";
import useWeather from "../../hooks/useWeather";

const format = new GeoJSON();
const regionsFeatures = format.readFeatures(regionsData);
const fieldsFeatures = format.readFeatures(fieldsData).filter((feature) => {
  return feature.values_?.type === "добыча";
});
const numberToLayerType = {
  0: "нефть",
  1: "газ",
};
function drawCircles(coordinatesArray): VectorLayer<VectorSource<Geometry>> {
  // Create a new VectorSource

  const source = new VectorSource();

  coordinatesArray.forEach((coords) => {
    const circle = new Circle(coords.values_.geometry.flatCoordinates, 9000); // Create a circle geometry around the point
    const feature = new Feature(circle);
    // Copy all the properties from the original feature to the new feature
    for (const prop in coords.values_) {
      if (prop !== "geometry") {
        feature.values_[prop] = coords.values_[prop];
      }
    }
    source.addFeature(feature); // Add the feature to the VectorSource
  });

  const style = new Style({
    fill: new Fill({
      color: "rgba(18, 255, 255, 1)",
    }),
    stroke: new Stroke({ color: "#041541" }),
    image: new CircleStyle({
      radius: 20000,
      fill: new Fill({
        color: "#ffcc33",
      }),
    }),
  });
  const vector = new VectorLayer({
    source: source,
    style: style,
    zIndex: 2,
  });
  return vector;
}
function drawLines(
  features,
  lineStyle = new Style({
    stroke: new Stroke({
      color: "blue", // Change this to your desired color
      width: 2, // Change this to your desired line width
    }),
  }),
) {
  const vectorSource = new VectorSource({
    features: features, // Initialize the vector source with the provided features
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: lineStyle, // Apply the custom style to the layer
    zIndex: 1,
  });

  return vectorLayer;
}

const getFieldsLayer = (
  bigNumberValue,
): VectorLayer<VectorSource<Geometry>> => {
  const currentType = numberToLayerType["" + bigNumberValue];
  if (currentType) {
    const featuresToDisplay = fieldsFeatures.filter((field) =>
      String(field.values_?.field_resources).includes(currentType),
    );
    const vl = new VectorLayer({
      source: new VectorSource({
        features: featuresToDisplay,
      }),
      zIndex: 1,
      // 4edbd9
      style: function (feature) {
        const fill = new Fill({
          color: "#4edbd9",
        });
        const stroke = new Stroke({
          color: "#0d6efd", // Set the color for the border
          width: 1, // Set the width of the border
        });

        return new Style({
          fill: fill,
          stroke: stroke,
        });
      },
    });
    return vl;
  }
};

const getOilGasPipelines = (bigNumberValue) => {
  const data = bigNumberValue === 0 ? oilPipelinesData : gasPipelinesData;
  const features = format.readFeatures(data);
  return drawLines(features);
};
const getTransmissionLines = () => {
  const features = format.readFeatures(transmissionLinesData);
  console.log(features);
  const lineStyle = new Style({
    stroke: new Stroke({
      color: "red", // Change this to your desired color
      width: 1, // Change this to your desired line width
    }),
  });
  return drawLines(features, lineStyle);
};

const getFactoriesLayer = () => {
  const features = format.readFeatures(factoriesData);
  return drawCircles(features);
};

const getPlantsLayer = () => {
  const features = format.readFeatures(plantsData);
  return drawCircles(features);
};

const colors = [
  "#FFC300", // Cyber Yellow
  "#3B82F6", // Neon Blue
  "#FF6D00", // Hyper Orange
  "#BADA55", // Hi-Tech Green
  "#FF3131",
];

const AppMap = () => {
  const bigNumberValue = useSelector(
    (state: RootState) => state.bigNumbers.value,
  );
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );
  const regionNameToColor = {};
  // "#FF00FF", // Neon Magenta
  //"#00A6ED", // Electric Blue

  for (let i = 0; i < Object.keys(regionNames).length; i++) {
    regionNameToColor[regionNames[Object.keys(regionNames)[i]]] =
      colors[i % colors.length];
  }
  const currentRegion = useSelector(
    (state: RootState) => state.regions.selectedRegion,
  );

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
    (location) => {
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
          const fill = new Fill({
            color: color,
          });
          const stroke = new Stroke({
            color: "black", // Set the color for the border
            width: 1, // Set the width of the border
          });

          return new Style({
            fill: fill,
            stroke: stroke,
          });
        },
      }),
    [],
  );

  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  const lastIdRef = useRef<number>(-1);
  const activeCategoryRef = useRef(activeCategory);
  const bigNumberValueRef = useRef(bigNumberValue);
  useEffect(() => {
    activeCategoryRef.current = activeCategory;
    bigNumberValueRef.current = bigNumberValue;
  }, [activeCategory, bigNumberValue]);
  const [popupText, setPopupText] = useState(null);
  const [popupVisibility, setPopupVisibility] = useState(false);

  const fieldsLayerRef = useRef([]);
  const getNextPopupText = (f) => {
    const activeCategory = activeCategoryRef.current;
    const bigNumberValue = bigNumberValueRef.current;
    let nextPopupText;
    if (activeCategory === 0) {
      if (bigNumberValue < 2) {
        nextPopupText = {
          Имя: f.values_.name,
          Оператор: f.values_.operator_name,
          Добыча: f.values_.field_resources,
        };
      } else if (bigNumberValue === 2) {
        nextPopupText = {
          Компания: f.values_.company,

          Статус: f.values_.status,
          Тип: f.values_.type,
        };
        if (f.values_.products) {
          nextPopupText["Продукты"] = f.values_.products;
        }
      }
    } else if (activeCategory === 1) {
      nextPopupText = {
        Компания: f.values_.company,
        Имя: f.values_.name,
        Тип: f.values_.type,
      };
    }
    return nextPopupText;
  };
  const popupOverlayRef = useRef(null);
  let selected = null;
  const selectStyle = new Style({
    fill: new Fill({
      color: "#eeeeee",
    }),
    stroke: new Stroke({
      color: "rgba(255, 255, 255, 0.7)",
      width: 2,
    }),
  });

  useEffect(() => {
    const base = new TileLayer({
      source: new OSM(),
    });

    //Giving the clipped layer an extent is necessary to avoid rendering when the feature is outside the viewport
    regionsLayer.getSource().on("addfeature", function () {
      base.setExtent(regionsLayer.getSource().getExtent());
    });

    const style = new Style({
      fill: new Fill({
        color: "black",
      }),
    });
    const onPostRender = (e) => {
      const polygons = [];
      regionsLayer.getSource().forEachFeature(function (feature) {
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
    };
    base.on("postrender", onPostRender);

    const mapLayers = [regionsLayer, base];

    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        controls: defaultControls({ attribution: false }).extend([
          new FullScreen(),
        ]),
        layers: mapLayers,
        view: view,
        target: ref.current,
      });

      popupOverlayRef.current = new Overlay({
        element: document.getElementById("popup"),
      });
      mapRef.current.addOverlay(popupOverlayRef.current);
      const onPointerMove = (e) => {
        if (selected !== null) {
          selected.setStyle(undefined);
          selected = null;
        }
        setPopupVisibility(false);

        mapRef.current.forEachFeatureAtPixel(e.pixel, (f) => {
          if (
            f.values_.type !== "district" &&
            f.values_.type !== "republic city"
          ) {
            setPopupVisibility(true);
          }
          if (
            f.values_.type !== "district" &&
            f.values_.type !== "republic city" &&
            lastIdRef.current !== f.values_.id
          ) {
            const nextPopupText = getNextPopupText(f);

            popupOverlayRef.current.setPosition(e.coordinate);
            setPopupText(nextPopupText);
            lastIdRef.current = f.values_.id;
          }
          selected = f;
          selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
          f.setStyle(selectStyle);

          return true;
        });
      };
      mapRef.current.on("pointermove", onPointerMove);
    }
  }, [activeCategory, bigNumberValue, getNextPopupText, regionsLayer, view]);

  useEffect(() => {
    let newLayers = [];
    if (activeCategory === 0) {
      if (bigNumberValue < 2) {
        newLayers = [
          getFieldsLayer(bigNumberValue),
          getOilGasPipelines(bigNumberValue),
        ];
      } else if (bigNumberValue === 2) {
        newLayers = [getFactoriesLayer()];
      }
    } else if (activeCategory === 1) {
      newLayers = [getPlantsLayer(), getTransmissionLines()];
    }
    for (const fieldsLayer of fieldsLayerRef.current) {
      mapRef.current.removeLayer(fieldsLayer);
    }
    fieldsLayerRef.current = newLayers;
    for (const newLayer of newLayers) {
      mapRef.current.addLayer(newLayer);
    }
  }, [activeCategory, bigNumberValue]);

  useEffect(() => {
    if (currentRegion) {
      const feature = regionsFeatures.filter(
        (feature) => feature.values_.name_ru === currentRegion,
      )[0];
      //.filter(feature => feature.values_.name_ru === currentRegion)
      const extent = feature.getGeometry().getExtent();
      const center = getCenter(extent);

      // Call the flyTo function when currentRegion changes
      flyTo(center);
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
          <div key={str}>
            {str.replace(/<br\/>/g, "")} <br></br>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppMap;

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "./AppMap.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VectorSource from "ol/source/Vector";

import GeoJSON from "ol/format/GeoJSON.js";

import { Vector as VectorLayer } from "ol/layer.js";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";

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

const regionsStyle = new Style({
  fill: new Fill({
    color: "#eeeeee",
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
  console.log("hi hi", bigNumberValue);
  const currentType = numberToLayerType["0"];
  if (currentType) {
    const featuresToDisplay = fieldsFeatures.filter((field) =>
      String(field.values_?.field_resources).includes(currentType)
    );
    return new VectorLayer({
      source: new VectorSource({
        features: featuresToDisplay,
      }),
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
  const bigNumberValue = useSelector((state: BigNumberState) => state.value);
  const regionNameToColor = {};
  const colors = ["#e9cfdb", "#faf0dd", "#d2e9ce", "#d0ebdb"];
  for (let i = 0; i < regionNames.length; i++) {
    regionNameToColor[regionNames[i]] = colors[i % colors.length];
  }
  const popupRef = useRef(null);
  const [zoom, setZoom] = useState(4);
  const [mapCenter, setMapCenter] = useState([
    7347086.392356056, 6106854.834885074,
  ]);
  const view = useMemo(
    () => new View({ center: mapCenter, zoom: zoom }),
    [mapCenter, zoom]
  );

  const flyTo = useCallback(
    (location, done) => {
      const duration = 2000;
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
        callback
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
        callback
      );
    },
    [view, zoom]
  );

  const regionsLayer = useMemo(
    () =>
      new VectorLayer({
        source: new VectorSource({
          features: regionsFeatures,
        }),
        style: function (feature) {
          const color = regionNameToColor[feature.values_.name_ru];
          regionsStyle.getFill().setColor(color);
          return regionsStyle;
        },
      }),
    [regionsData, regionsStyle]
  );

  regionsLayer.setOpacity(0.8);
  console.log(bigNumberValue);
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  let lastIdRef = useRef<number>(-1);

  const [popupText, setPopupText] = useState("");
  const [popupVisibility, setpopupVisibility] = useState(false);

  useEffect(() => {
    const fieldsLayer = getFieldsLayer(bigNumberValue);
    const mapLayers = [new TileLayer({ source: new OSM() }), regionsLayer];
    if (fieldsLayer) mapLayers.push(fieldsLayer);
    //new TileLayer({ source: new OSM() }),
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
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
          console.log(e);
        }
        setpopupVisibility(false);
        mapRef.current.forEachFeatureAtPixel(e.pixel, function (f) {
          if (f.values_.type !== "district") setpopupVisibility(true);
          if (
            f.values_.type !== "district" &&
            lastIdRef.current !== f.values_.id
          ) {
            console.log(f.values_.operator_name);
            console.log(e.coordinate);
            popup.setPosition(e.coordinate);
            setPopupText(f.values_.operator_name);
            lastIdRef.current = f.values_.id;
          }
          selected = f;
          selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
          f.setStyle(selectStyle);

          return true;
        });
      });
    }
  }, [ref, mapRef, mapCenter, zoom, regionsLayer, bigNumberValue]);

  if (currentRegion) {
    console.log(currentRegion);
    const feature = regionsFeatures.filter(
      (feature) => feature.values_.name_ru === currentRegion
    )[0];
    //.filter(feature => feature.values_.name_ru === currentRegion)
    console.log(feature);
    const extent = feature.getGeometry().getExtent();
    const center = getCenter(extent);
    flyTo(center, (e) => {
      console.log(e);
    });
  }
  return (
    <>
      <div ref={ref} id="map" />
      <div
        id="popup"
        ref={popupRef}
        className={popupVisibility ? "" : "hidden"}
      >
        {popupText}
      </div>
    </>
  );
};

export default AppMap;

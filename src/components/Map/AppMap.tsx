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

const getFieldsLayer = () => {
  const currentType = "нефть";
  const featuresToDisplay = fieldsFeatures.filter((field) =>
    String(field.values_?.field_resources).includes(currentType)
  );
  return useMemo(
    () =>
      new VectorLayer({
        source: new VectorSource({
          features: featuresToDisplay,
        }),
        style: function (feature) {
          fieldsStyle.getFill().setColor("#000");
          return fieldsStyle;
        },
      }),
    []
  );
};

interface AppMapProps {
  currentRegion: string;
}

const AppMap = ({ currentRegion }: AppMapProps) => {
  const regionNameToColor = {};
  const colors = ["#e9cfdb", "#faf0dd", "#d2e9ce", "#d0ebdb"];
  for (let i = 0; i < regionNames.length; i++) {
    regionNameToColor[regionNames[i]] = colors[i % colors.length];
  }
  const [zoom, setZoom] = useState(4);
  const [mapCenter, setMapCenter] = useState([
    7347086.392356056, 6106854.834885074,
  ]);

  const set1 = new Set();
  const set2 = new Set();

  console.log(set1);
  console.log(set2);
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

  const fieldsLayer = getFieldsLayer();

  regionsLayer.setOpacity(0.8);

  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  useEffect(() => {
    //new TileLayer({ source: new OSM() }),
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [
          new TileLayer({ source: new OSM() }),
          regionsLayer,
          fieldsLayer,
        ],
        view: view,
        target: ref.current,
      });

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

        mapRef.current.forEachFeatureAtPixel(e.pixel, function (f) {
          console.log(f);
          selected = f;
          selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
          f.setStyle(selectStyle);
          return true;
        });
      });
    }
  }, [ref, mapRef, mapCenter, zoom, regionsLayer]);

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
    </>
  );
};

export default AppMap;

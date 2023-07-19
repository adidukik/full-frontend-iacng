import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from "ol/source/OSM";
import Extent from 'ol/interaction/Extent.js'
import './AppMap.css';
import { useEffect, useRef, useState } from 'react';
import { fromLonLat, useGeographic } from 'ol/proj';
import { Card } from 'primereact/card';
import VectorSource from 'ol/source/Vector';

import GeoJSON from 'ol/format/GeoJSON.js';

import XYZ from 'ol/source/XYZ.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';

import regionsData from '../../assets/geo/kz_regions.json';
import fieldsData from '../../assets/geo/fields.json';
import { Feature } from 'ol';
import { getCenter } from 'ol/extent';
import Geometry from 'ol/geom/Geometry';

const AppMap = () => {
  // useGeographic();
  const [zoom, setZoom] = useState(4);
  const [mapCenter, setMapCenter] = useState([7347086.392356056, 6106854.834885074]);

  console.log(regionsData.features);
  const format = new GeoJSON();
  const features = format.readFeatures(regionsData);

  const view = new View({ center: mapCenter, zoom: zoom });
  const flyTo = (location, done) => {
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
  }

  const style = new Style({
    fill: new Fill({
      color: '#eeeeee',
    }),
  });

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(regionsData),

    }),
    style: function (feature) {
      const color = feature.get('COLOR') || '#eeeeee';
      style.getFill().setColor(color);
      return style;
    },
  });


  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  useEffect(() => {
    console.log("I'm mounting!");

    //new TileLayer({ source: new OSM() }), 
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() }), vectorLayer],
        view: view,
        target: ref.current
      });
    }
  }, [ref, mapRef, mapCenter, zoom, vectorLayer]);

  // useEffect(() => {
  // //   mapRef.current?.getView().setZoom(zoom);
  //  // mapRef.current?.getView().setCenter([0,0.6]);
  // }, [mapRef, zoom]);

  setTimeout(() => {
    const feature = features[0];
    console.log(feature);
    const extent = feature.getGeometry().getExtent();
    const center = getCenter(extent);
    flyTo(center, (e) => { console.log(e) });
  }, 2000);

  return (
    <>
      <div ref={ref} id='map' />
    </>

  );


};

export default AppMap;
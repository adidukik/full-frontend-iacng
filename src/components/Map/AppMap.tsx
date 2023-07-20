import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from "ol/source/OSM";
import './AppMap.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import VectorSource from 'ol/source/Vector';

import GeoJSON from 'ol/format/GeoJSON.js';

import { Vector as VectorLayer } from 'ol/layer.js';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';

import regionsData from '../../assets/geo/kz_regions.json';
import fieldsData from '../../assets/geo/fields.json';
import { getCenter } from 'ol/extent';
import { regionNames } from '../Regions/Regions';

console.log("fields", fieldsData);
console.log("region", regionsData);
interface AppMapProps{
  currentRegion:string;
}

const AppMap = ({currentRegion}: AppMapProps) => {
  const regionNameToColor = {};
   const colors = ['#e9cfdb', '#faf0dd', '#d2e9ce', '#d0ebdb'];
  for(let i=0;i < regionNames.length;i++){
    regionNameToColor[regionNames[i]] = colors[i%colors.length];
  }
  // useGeographic();
  const [zoom, setZoom] = useState(4);
  const [mapCenter, setMapCenter] = useState([7347086.392356056, 6106854.834885074]);
  const format = new GeoJSON();
  const regionsFeatures = format.readFeatures(regionsData);
  const fieldsFeatures = format.readFeatures(fieldsData);

  const view = useMemo(() => new View({ center: mapCenter, zoom: zoom }), [mapCenter, zoom]);

  const flyTo = useCallback((location, done) => {
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
  }, [view,zoom]);

  const style = new Style({
    fill: new Fill({
      color: '#eeeeee',
    }),
  });

 const regionsLayer = useMemo(() => new VectorLayer({
  source: new VectorSource({
    features: regionsFeatures,
  }),
  style: function (feature) {
      const color =regionNameToColor[feature.values_.name_ru];
      style.getFill().setColor(color);
      return style;
  },
}), [regionsData, style]);

const fieldsLayer = useMemo(() => new VectorLayer({
  source: new VectorSource({
    features: fieldsFeatures,
  }),
  style: function (feature) {
      style.getFill().setColor("#ffffff");
      return style;
  },
}), []);

  regionsLayer.setOpacity(0.8);

  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  useEffect(() => {
    //new TileLayer({ source: new OSM() }), 
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() }), regionsLayer, fieldsLayer],
        view: view,
        target: ref.current
      });
    }
  }, [ref, mapRef, mapCenter, zoom, regionsLayer]);

  // useEffect(() => {
  // //   mapRef.current?.getView().setZoom(zoom);
  //  // mapRef.current?.getView().setCenter([0,0.6]);
  // }, [mapRef, zoom]);

   if(currentRegion){
    console.log(currentRegion);
    const feature =  regionsFeatures.filter(feature => feature.values_.name_ru === currentRegion)[0]
    //.filter(feature => feature.values_.name_ru === currentRegion)
    console.log(feature);
    const extent = feature.getGeometry().getExtent();
    const center = getCenter(extent);
    flyTo(center, (e) => { console.log(e) });
  }



  return (
    <>
      <div ref={ref} id='map' />
    </>

  );


};

export default AppMap;
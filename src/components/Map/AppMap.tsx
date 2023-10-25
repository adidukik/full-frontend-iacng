import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import "./AppMap.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, Geometry, MultiPolygon, Point, Polygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON.js";
import { FullScreen, defaults as defaultControls } from "ol/control.js";
import { Vector as VectorLayer } from "ol/layer.js";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import { OSM, Vector as VectorSource } from "ol/source.js";
import factoriesData from "../../assets/geo/factories.json";
import plantsData from "../../assets/geo/power_plants.json";
import oilPipelinesData from "../../assets/geo/oil_pipelines.json";
import transmissionLinesData from "../../assets/geo/transmission_lines.json";
import gasPipelinesData from "../../assets/geo/gas_pipelines.json";
import employeesData from "../../assets/geo/employeers.json";
import { getCenter } from "ol/extent";
import { regionNames } from "../Regions/Regions";
import Stroke from "ol/style/Stroke";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "ol/Overlay";
import { RootState } from "../../../store";
import { getVectorContext } from "ol/render";
import { Feature } from "ol";
import { Circle as CircleStyle } from "ol/style.js";
import { Category } from "../CategoriesMenu/categoriesSlice";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import {
  setContractVisibility,
  setCurrentContractor,
  setRenewablePlants,
} from "./mapSlice";
import useFetchData from "../../hooks/useFetchData";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  displayedRegionsArr,
  displayedRegionsNamesArr,
  getFieldsLayer,
  regionsFeatures,
} from "./layers/fieldsLayer";
import { APP_CONFIG } from "../../../app.config";
import { Button } from "@mui/material";

const ADDITIONAL_BACKEND_URL = APP_CONFIG.ADDITIONAL_BACKEND_URL;

const format = new GeoJSON();
const operatorIdToEmployees = {};
for (const el of format.readFeatures(employeesData)) {
  operatorIdToEmployees[el.get("company_id")] = [
    el.get("num_employees"),
    el.get("num_kz_employees"),
  ];
}
const plantsFeatures = format.readFeatures(plantsData);

function drawCircles(
  coordinatesArray,
  params,
): VectorLayer<VectorSource<Geometry>> {
  const { displayedRegions, currentCompanyId, currentZoom } = params;

  const source = new VectorSource();

  coordinatesArray.forEach((coords: Feature) => {
    displayedRegions.forEach((regionFeature: Feature) => {
      const regionGeometry = regionFeature?.getGeometry();
      const pointGeometry = coords?.getGeometry();
      const pointCoordinates = pointGeometry?.flatCoordinates;

      if (
        currentCompanyId === 0 ||
        regionGeometry.intersectsCoordinate(pointCoordinates)
      ) {
        const circleRadius = 111500000 / Math.pow(currentZoom, 5);
        const circle = new Circle(pointCoordinates, circleRadius);
        const feature = new Feature(circle);
        for (const prop in coords.values_) {
          if (prop !== "geometry") {
            feature.set(prop, coords.values_[prop]);
          }
        }
        source.addFeature(feature);
      }
    });
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
    zIndex: 1,
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
): VectorLayer<VectorSource> {
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

const getOilGasPipelines = (params): VectorLayer<VectorSource> => {
  const { displayedRegions, currentCompanyId, currentBigNumberId } = params;
  const data =
    currentBigNumberId === "oil_yield" ? oilPipelinesData : gasPipelinesData;
  let features = format.readFeatures(data);
  if (currentCompanyId !== 0) {
    features = features.filter((field) =>
      displayedRegions.some((regionFeature) =>
        field
          .getGeometry()
          .intersectsExtent(regionFeature.getGeometry().getExtent()),
      ),
    );
  }

  return drawLines(features);
};
const getTransmissionLines = (params): VectorLayer<VectorSource> => {
  const { displayedRegions, currentCompanyId } = params;
  let features = format.readFeatures(transmissionLinesData);

  const lineStyle = new Style({
    stroke: new Stroke({
      color: "red", // Change this to your desired color
      width: 1, // Change this to your desired line width
    }),
  });

  if (currentCompanyId !== 0) {
    features = features.filter((field) =>
      // Check if the feature intersects with any displayed region
      displayedRegions.some((regionFeature) =>
        field
          .getGeometry()
          .intersectsExtent(regionFeature.getGeometry().getExtent()),
      ),
    );
  }

  return drawLines(features, lineStyle);
};

const getFactoriesLayer = (params) => {
  const features = format.readFeatures(factoriesData);
  return drawCircles(features, params);
};
const renewableSources = [
  "гидроэлектростанция",
  "ветряная электростанция",
  "солнечная электростанция",
];
const getPlantsLayer = (params) => {
  const { currentBigNumberId, renewablePlantsCallback } = params;
  let filteredPlantsFeatures = plantsFeatures;
  if (currentBigNumberId === "renewable_energy") {
    filteredPlantsFeatures = plantsFeatures.filter((feature) =>
      renewableSources.includes(feature.get("type")),
    );
    renewablePlantsCallback(filteredPlantsFeatures);
  }
  return drawCircles(filteredPlantsFeatures, params);
};

const colors = [
  "#FFC300", // Cyber Yellow
  "#3B82F6", // Neon Blue
  "#FF6D00", // Hyper Orange
  "#BADA55", // Hi-Tech Green
  "#FF3131",
];
const DEFAULT_ZOOM = 5;
const DEFAULT_MAP_CENTER = [7347086.392356056, 6106854.834885074];
const view = new View({ center: DEFAULT_MAP_CENTER, zoom: DEFAULT_ZOOM });
// populating regionNameToColor
const regionNameToColor = {};
for (let i = 0; i < Object.keys(regionNames).length; i++) {
  regionNameToColor[regionNames[Object.keys(regionNames)[i]]] =
    colors[i % colors.length];
}
// ------
const flyTo = (location): void => {
  const duration = 500;
  let parts = 2;
  let called = false;
  function callback(complete): void {
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
      zoom: DEFAULT_ZOOM - 1,
      duration: duration / 2,
    },
    {
      zoom: DEFAULT_ZOOM,
      duration: duration / 2,
    },
    callback,
  );
};

const AppMap = () => {
  const bigNumberValue = useSelector(
    (state: RootState) => state.bigNumbers.value,
  );
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );

  const currentRegion = useSelector(
    (state: RootState) => state.regions.selectedRegion,
  );
  const currentCompanyId = useSelector(
    (state: RootState) => state.auth.currentCompanyId,
  );
  const currentBigNumberId = useSelector(
    (state: RootState) => state.bigNumbers.currentBigNumberId,
  );
  const currentContractor = useSelector(
    (state: RootState) => state.map.currentContractor,
  );
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const regionsLayer = useMemo(
    () =>
      new VectorLayer({
        source: new VectorSource({
          features: regionsFeatures,
        }),
        zIndex: 1,
        opacity: 0.6,
        style: function (feature) {
          const isDisplayed = displayedRegionsNamesArr.includes(
            feature.get("name_ru"),
          );

          const color =
            isDisplayed || currentCompanyId === 0
              ? regionNameToColor[feature.get("name_ru")]
              : "#000000";
          const fill = new Fill({
            color: color,
          });
          const stroke = new Stroke({
            color: "black", // Set the color for the border
            width: 1, // Set the width of the border
          });
          const myStyle = new Style({
            fill: fill,
            stroke: stroke,
          });

          return myStyle;
        },
      }),
    [],
  );

  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  const lastIdRef = useRef<number>(-1);
  const [popupText, setPopupText] = useState(null);
  const [popupVisibility, setPopupVisibility] = useState(false);

  const fieldsLayerRef = useRef([]);
  const getNextPopupText = (f: Feature) => {
    const operator_id = f.get("operator_id");
    const nextPopupText = {
      Имя: f.get("name"),
      Оператор: f.get("operator_name"),
      Добыча: f.get("field_resources"),
      Компания: f.get("company"),
      "Диаметр (мм)": f.get("diameters"),
      "Длина (км)": f.get("length"),
      Название: f.get("name_ru"),
      Мощность: formatNumberWithSpaces(f.get("power")),
      Статус: f.get("status"),
      Тип: f.get("type"),
      Продукты: f.get("products"),
      "Напряжение (Вольт)": formatNumberWithSpaces(f.get("voltage")),
      Работники:
        operator_id && operatorIdToEmployees[operator_id]
          ? operatorIdToEmployees[operator_id][0]
          : null,
      "Работники (граждане РК)":
        operator_id && operatorIdToEmployees[operator_id]
          ? operatorIdToEmployees[operator_id][1]
          : null,
    };

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
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);
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
        mapRef.current.forEachFeatureAtPixel(e.pixel, (f: Feature) => {
          selected = f;
          selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
          f.setStyle(selectStyle);

          return true;
        });
      };
      const onMapClick = (e) => {
        mapRef.current.forEachFeatureAtPixel(e.pixel, (f: Feature) => {
                      setPopupVisibility(false);

          if (
            f.get("type") !== "district" &&
            f.get("type") !== "republic city"
          ) {
            setPopupVisibility(true);

            dispatch(setCurrentContractor(f.get("name")));
            if (lastIdRef.current !== f.get("id")) {
              const nextPopupText = getNextPopupText(f);
              popupOverlayRef.current.setPosition(e.coordinate);
              setPopupText(nextPopupText);
              lastIdRef.current = f.get("id");
              console.log("baka");
            }
          } 
          

          selected = f;
          selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
          f.setStyle(selectStyle);

          return true;
        });
      };
      mapRef.current.on("click", onMapClick);
      mapRef.current.on("pointermove", onPointerMove);

      let currZoom = mapRef.current.getView().getZoom();
      mapRef.current.on("moveend", function (e) {
        const newZoom = mapRef.current.getView().getZoom();
        if (currZoom != newZoom) {
          setCurrentZoom(currZoom);
          currZoom = newZoom;
        }
      });
    }
  }, [activeCategory, bigNumberValue, getNextPopupText, regionsLayer, view]);

  useEffect(() => {
    let newLayers = [];
    const renewablePlantsCallback = (features: Feature[]) => {
      dispatch(
        setRenewablePlants(features.map((feature) => feature.get("id"))),
      );
    };
    const params = {
      currentBigNumberId,
      displayedRegions: displayedRegionsArr,
      currentCompanyId,
      renewablePlantsCallback,
      currentZoom,
    };
    if (
      currentBigNumberId === "oil_yield" ||
      currentBigNumberId === "gas_yield"
    ) {
      newLayers = [getFieldsLayer(params), getOilGasPipelines(params)];
    } else if (currentBigNumberId === "oil_products_yield") {
      newLayers = [getFactoriesLayer(params)];
    } else if (
      currentBigNumberId === "energy_generation" ||
      currentBigNumberId === "renewable_energy"
    ) {
      const filteredTransmissionLines = getTransmissionLines(params);
      newLayers = [getPlantsLayer(params), filteredTransmissionLines];
    }

    for (const fieldsLayer of fieldsLayerRef.current) {
      mapRef.current.removeLayer(fieldsLayer);
    }
    fieldsLayerRef.current = newLayers;
    for (const newLayer of newLayers) {
      mapRef.current.addLayer(newLayer);
    }
  }, [
    activeCategory,
    bigNumberValue,
    currentBigNumberId,
    currentCompanyId,
    currentZoom,
    dispatch,
  ]);

  useEffect(() => {
    if (currentRegion) {
      let feature;
      if (activeCategory === 0) {
        feature = regionsFeatures.filter(
          (regionsFeature) => regionsFeature.get("name_ru") === currentRegion,
        )[0];
      } else if (
        currentBigNumberId === "energy_generation" ||
        currentBigNumberId === "renewable_energy"
      ) {
        feature = plantsFeatures.filter(
          (regionsFeature) => regionsFeature.get("id") === currentRegion,
        )[0];
      }

      if (feature) {
        const extent = feature.getGeometry().getExtent();
        const center = getCenter(extent);

        flyTo(center);
      }
    }
  }, [activeCategory, currentBigNumberId, currentRegion]);

  const getPopupText = (popupText) => {
    const arr = [];
    for (const popupTextItem in popupText) {
      if (popupText[popupTextItem]) {
        const keyval = [popupTextItem, popupText[popupTextItem]];

        // Step 4: Store each formatted string in an array
        arr.push(keyval);
      }
    }
    return arr;
  };
  const ndpi = Math.floor(
    useFetchData("http://192.168.0.57:8000/calculate_ndpi/", false, true),
  );
  const [contractValidity, setContractValidity] = useState(false);
 
  useEffect(()=>{
     const isContractValid = () => {
    if(!currentContractor) return false;
    fetch(
      `http://192.168.0.57:8001/search_asset/?name_to_search=${currentContractor}`,
    )
      .then((response) => {
         if (response.status === 404) {
      console.log('Resource not found (404 error)');
          setContractValidity(false) ;
    }else
        if (response.ok) {
          console.log("Success");
          setContractValidity(true) ;
        } else {
          console.log("Error:", response.status);
          setContractValidity(false) ;
        }
      })
      .catch((error) => {
        console.log("Fetch error:", error);
          setContractValidity(false) ;
      });
  };
    isContractValid();
  }, [currentContractor])
  return (
    <>
      <div ref={ref} id="map" />

      <div
        id="popup"
        ref={popupRef}
        className={`${popupVisibility ? "" : "hidden"} text-white`}
      >
        <table cellSpacing={0} cellPadding={0}>
          <tbody>
            {getPopupText(popupText).map((keyval) => (
              <tr key={keyval[0]}>
                <td>{keyval[0]}</td>
                <td>{keyval[1]}</td>
              </tr>
            ))}
            {contractValidity && (
              <tr>
                <td>
                  <Button
                    onClick={() => {
                      dispatch(setContractVisibility(true));
                      // href={`${ADDITIONAL_BACKEND_URL}/search_asset/?name_to_search=${ popupText && popupText["Имя"]
                    }}
                  >
                    Контракт
                    <LaunchIcon
                      style={{
                        width: "10px",
                        marginLeft: "5px",
                      }}
                    />
                  </Button>
                </td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="position-absolute top-0 end-0">
        {ndpi && (
          <div
            className="p-2 text-white"
            style={{
              backgroundColor: "#060b28",
              borderBottomLeftRadius: "10px",
            }}
          >
            НДПИ: <span style={{ color: "#4dffdf" }}>{ndpi}</span> млн. тенге
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default AppMap;

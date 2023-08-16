import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import "./AppMap.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, Geometry, MultiPolygon, Point } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON.js";
import { FullScreen, defaults as defaultControls } from "ol/control.js";
import { Vector as VectorLayer } from "ol/layer.js";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import { OSM, Vector as VectorSource } from "ol/source.js";
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
import { useDispatch, useSelector } from "react-redux";
import Overlay from "ol/Overlay";
import { RootState } from "../../../store";
import { getVectorContext } from "ol/render";
import { Feature } from "ol";
import { Circle as CircleStyle } from "ol/style.js";
import { Category } from "../CategoriesMenu/categoriesSlice";

const format = new GeoJSON();
const regionsFeatures = format.readFeatures(regionsData);
const fieldsFeatures = format.readFeatures(fieldsData).filter((feature) => {
  return feature.get("type") === "добыча";
});
const numberToLayerType = {
  0: "нефть",
  1: "газ",
};
function drawCircles(
  coordinatesArray,
  params,
): VectorLayer<VectorSource<Geometry>> {
  const { displayedRegions, currentCompanyId } = params;

  const source = new VectorSource();

  coordinatesArray.forEach((coords: Point) => {
    console.log(coords)
    displayedRegions.forEach((regionFeature: Polygon) => {
      const regionGeometry = regionFeature.getGeometry();
      const pointGeometry = coords.getGeometry();
      if (
        currentCompanyId === 0 
        ||
        regionGeometry.intersectsCoordinate(coords.getGeometry().flatCoordinates)
      ) {
        const circle = new Circle(
          coords.values_.geometry.flatCoordinates,
          9000,
        ); // Create a circle geometry around the point
        const feature = new Feature(circle);
        // Copy all the properties from the original feature to the new feature
        for (const prop in coords.values_) {
          if (prop !== "geometry") {
            feature.set(prop, coords.values_[prop]);
          }
        }
        source.addFeature(feature); // Add the feature to the VectorSource
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
    zIndex: 1
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

const getFieldsLayer = (params): VectorLayer<VectorSource<Geometry>> => {
  const { bigNumberValue, displayedRegions, currentCompanyId } = params;
  const currentType = numberToLayerType["" + bigNumberValue];
  if (currentType) {
    let featuresToDisplay = fieldsFeatures.filter((field) =>
      String(field.get("field_resources")).includes(currentType),
    );
    if (currentCompanyId !== 0) {
      featuresToDisplay = featuresToDisplay.filter((field) =>
        // Check if the feature intersects with any displayed region
        displayedRegions.some((regionFeature) =>
          field
            .getGeometry()
            .intersectsExtent(regionFeature.getGeometry().getExtent()),
        ),
      );
    }

    // .filter((field) =>
    //   String(field.values_?.operator_name)
    //     .toLowerCase()
    //     .includes("саутс"),
    // );
    const vl = new VectorLayer({
      source: new VectorSource({
        features: featuresToDisplay,
      }),
      zIndex: 1,
      // 4edbd9
      style: function () {
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

const getOilGasPipelines = (params): VectorLayer<VectorSource> => {
  const { bigNumberValue, displayedRegions, currentCompanyId } = params;
  const data = bigNumberValue === 0 ? oilPipelinesData : gasPipelinesData;
  let features = format.readFeatures(data);
  console.log(displayedRegions);
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

  return drawLines(features);
};
const getTransmissionLines= (params): VectorLayer<VectorSource>  => {
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

const getPlantsLayer = (params) => {
  const features = format.readFeatures(plantsData);
  return drawCircles(features, params);
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
  // const displayedRegions = useSelector(
  //   (state: RootState) => state.regions.displayedRegions,
  // );
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const displayedRegionsMap = {};
  const regionNameToFeature = {};

  regionsFeatures.forEach((feature) => {
    regionNameToFeature[feature.get("name_ru")] = feature;
  });
  for (const feature of fieldsFeatures) {
    if (feature.get("operator_name").toLowerCase().includes("саутс")) {
      displayedRegionsMap[feature.get("au_name")] =
        regionNameToFeature[feature.get("au_name")];
    }
  }
  const displayedRegionsArr = Array.from(Object.values(displayedRegionsMap));
  const displayedRegionsNamesArr = Object.keys(displayedRegionsMap);
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
              : "#e5e5e5";
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

        mapRef.current.forEachFeatureAtPixel(e.pixel, (f: Feature) => {
          if (
            f.get("type") !== "district" &&
            f.get("type") !== "republic city"
          ) {
            setPopupVisibility(true);
          }
          if (
            f.get("type") !== "district" &&
            f.get("type") !== "republic city" &&
            lastIdRef.current !== f.get("id")
          ) {
            const nextPopupText = getNextPopupText(f);

            popupOverlayRef.current.setPosition(e.coordinate);
            setPopupText(nextPopupText);
            lastIdRef.current = f.get("id");
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
    const params = {
      bigNumberValue,
      displayedRegions: displayedRegionsArr,
      currentCompanyId,
    };
    if (activeCategory === 0) {
      if (bigNumberValue < 2) {
        newLayers = [getFieldsLayer(params), getOilGasPipelines(params)];
      } else if (bigNumberValue === 2) {
        newLayers = [getFactoriesLayer(params)];
      }
    } else if (activeCategory === 1) {
      newLayers = [getPlantsLayer(params), getTransmissionLines(params)];
    }
    for (const fieldsLayer of fieldsLayerRef.current) {
      mapRef.current.removeLayer(fieldsLayer);
    }
    fieldsLayerRef.current = newLayers;
    for (const newLayer of newLayers) {
      mapRef.current.addLayer(newLayer);
    }
  }, [activeCategory, bigNumberValue, dispatch]);

  useEffect(() => {
    if (currentRegion) {
      const feature = regionsFeatures.filter(
        (feature) => feature.get("name_ru") === currentRegion,
      )[0];
      //.filter(feature => feature.values_.name_ru === currentRegion)
      const extent = feature.getGeometry().getExtent();
      const center = getCenter(extent);

      // Call the flyTo function when currentRegion changes
      flyTo(center);
    }
  }, [currentRegion, flyTo]);

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

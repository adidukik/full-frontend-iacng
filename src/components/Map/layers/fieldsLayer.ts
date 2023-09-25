import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import fieldsData from "../../../assets/geo/fields.json";
import regionsData from "../../../assets/geo/kz_regions.json";

const format = new GeoJSON();
export const regionsFeatures = format.readFeatures(regionsData);

const idToLayerType = {
  oil_yield: "нефть",
  gas_yield: "газ",
};
const fieldsFeatures = format.readFeatures(fieldsData).filter((feature) => {
  return feature.get("type") === "добыча";
});
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

export  const displayedRegionsArr = Array.from(Object.values(displayedRegionsMap));
export  const displayedRegionsNamesArr = Object.keys(displayedRegionsMap);


export const getFieldsLayer = (params): VectorLayer<VectorSource<Geometry>> => {
  const { currentBigNumberId, displayedRegions, currentCompanyId } = params;
  const currentType = idToLayerType[currentBigNumberId];

  if (currentType) {
    let featuresToDisplay = fieldsFeatures.filter((field) =>
      String(field.get("field_resources")).includes(currentType)
    );
    if (currentCompanyId !== 0) {
      featuresToDisplay = featuresToDisplay.filter((field) =>
        // Check if the feature intersects with any displayed region
        displayedRegions.some((regionFeature) =>
          field
            .getGeometry()
            .intersectsExtent(regionFeature.getGeometry().getExtent())
        )
      );
    }

    const vl = new VectorLayer({
      source: new VectorSource({
        features: featuresToDisplay,
      }),
      zIndex: 1,
      style: function () {
        const fill = new Fill({
          color: "#4edbd9",
        });
        const stroke = new Stroke({
          color: "#0d6efd",
          width: 1,
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

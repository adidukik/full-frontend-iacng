import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addChosenCountry,
  removeChosenCountry,
} from "./opecSlice";
import { CountryCurrentOpecData } from "../../interfaces/opecSlice";

interface LabelWithCheckboxProps {
  el: CountryCurrentOpecData;
}

const LabelWithCheckbox = ({ el }: LabelWithCheckboxProps): JSX.Element => {
  const dispatch = useDispatch();
  const chosenCountries = useSelector(
    (state: RootState) => state.opec.chosenCountries,
  );
  const handleCountryCheckboxChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): void => {
    if (checked) {
      dispatch(addChosenCountry(el.country));
    } else {
      dispatch(removeChosenCountry(el.country));
    }
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={chosenCountries.includes(el.country)}
          onChange={handleCountryCheckboxChange}
          name="checkbox3"
        />
      }
      label={el.country}
    />
  );
};

export default LabelWithCheckbox;

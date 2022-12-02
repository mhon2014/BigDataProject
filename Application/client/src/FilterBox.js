import {Context} from "./Context";

import "./FilterBox.css"

import {useContext, useEffect} from "react";
import { MultiSelect } from "react-multi-select-component";

export default function FilterBox() {
  const {
    setData, selectCategory, setSelectCategory,
    selectCountry, setSelectCountry, allPoints,
    selectSensor, setSelectSensor, sensors,
    categories, countries
  } = useContext(Context);

  // Updates the map to show the filtered/unfiltered
  useEffect(() => {
    // No filter applied
    if (selectCategory.length === 0 && selectCountry.length === 0 && selectSensor.length === 0) {
      setData([]);
    }
    // Some filters applied
    else {
      // Extract the category names to match the json format
      const filterCategory = selectCategory.map(x => x.value);
      const filterCountry = selectCountry.map(x => x.value);
      const filterSensor = selectSensor.map(x => x.value);

      let filtered = []

      // Filters for the given filter category conditions
      filtered = allPoints.filter(function (point) {
        return filterCategory.includes(point.category);
      });

      // Filters for the given filter country code conditions
      if (selectCountry.length > 0 && filtered.length !== 0) {
        filtered = filtered.filter(function (point) {
          return filterCountry.includes(point.country_code);
        });
      }
      else if (selectCountry.length > 0 && filtered.length === 0) {
        filtered = allPoints.filter(function (point) {
          return filterCountry.includes(point.country_code);
        });
      }

      // Filters for the given filter sensor conditions
      if (selectSensor.length > 0 && filtered.length !== 0) {
        filtered = filtered.filter(function (point) {
          return filterSensor.includes(point.sensor_platform_name);
        });
      }
      else if (selectSensor.length > 0 && filtered.length === 0) {
        filtered = allPoints.filter(function (point) {
          return filterSensor.includes(point.sensor_platform_name);
        });
      }

      // Update the new points
      setData(filtered);
    }
    // eslint-disable-next-line
  }, [selectCategory, selectCountry, selectSensor]);

  return (
    <div className="filter_box">
      <form className="form_extend">
        <MultiSelect
          className="category"
          selectAll
          options={categories}
          value={selectCategory}
          onChange={setSelectCategory}
          overrideStrings={{"selectSomeItems":'Select Category...'}}
          labelledBy="Select"
        />
        <MultiSelect
          className="country"
          selectAll
          options={countries}
          value={selectCountry}
          onChange={setSelectCountry}
          overrideStrings={{"selectSomeItems":'Select Country...'}}
          labelledBy="Select"
        />
        <MultiSelect
          className="sensor"
          selectAll
          options={sensors}
          value={selectSensor}
          onChange={setSelectSensor}
          overrideStrings={{"selectSomeItems":'Select Sensor...'}}
          labelledBy="Select"
        />
      </form>
    </div>
  );
}
import {Context} from "./Context";

import "./FilterBox.css"

import {useContext, useEffect} from "react";
import { MultiSelect } from "react-multi-select-component";

export default function FilterBox() {
  const {setData, selectFilter, setSelectFilter, allPoints, categories} = useContext(Context);

  // Updates the map to show the filtered/unfiltered
  useEffect(() => {
    // No filter applied
    if (selectFilter.length === 0) {
      setData([]);
    }
    // All filters applied
    else if (selectFilter.length === 62) {
      setData(allPoints);
    }
    // Some filters applied
    else {
      // Extract the category names to match the json format
      const currList = selectFilter.map(x => x.value);

      // Filters for the given filter conditions
      const result = allPoints.filter(function (point) {
        return currList.includes(point.category);
      });

      // Update the new points
      setData(result);
    }
    // eslint-disable-next-line
  }, [selectFilter]);

  return (
    <div className="filter_box">
      <form className="form_extend">
        <MultiSelect
          selectAll
          options={categories}
          value={selectFilter}
          onChange={setSelectFilter}
          labelledBy="Select"
        />
      </form>
    </div>
  );
}
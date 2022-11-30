import {Context} from "./Context";

import "./FilterBox.css"

import {useContext} from "react";
import { MultiSelect } from "react-multi-select-component";

export default function FilterBox() {
  const {categories, filter} = useContext(Context);
  const [category, setCategory] = categories;
  const [selectFilter, setSelectFilter] = filter;

  return (
    <div className="filter_box">
      <form className="form_extend">
        <MultiSelect
          selectAll
          options={category}
          value={selectFilter}
          onChange={setSelectFilter}
          labelledBy="Select"
        />
      </form>
    </div>
  );
}
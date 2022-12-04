// import logo from './logo.svg';
import {Context}  from './Context';

import SideBar from './SideBar';
import FilterBox from "./FilterBox";
import Scatterplot from './layers/Scatterplot';
import Polygon from './layers/Polygon';

import './App.css';

import {React, useState} from 'react';

// https://ckochis.com/deck-gl-layers

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.466233,
  // longitude: 0,
  latitude: 37.684638,
  // latitude: 0,
  zoom: 0.75,
  pitch: 0,
  bearing: 0
};

// Data to be used by the layer
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';

function App() {
  const [toggle, setToggle] = useState(false);
  const [locationInfo, setLocationInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectSensor, setSelectSensor] = useState([]);
  const [allPoints, setAllPoints] = useState([]);
  const [data, setData] = useState([]);

  const contextStates = {
    INITIAL_VIEW_STATE,
    MAPBOX_ACCESS_TOKEN,
    MAP_STYLE,
  }

  // React.useEffect(() => {
  //   axios.get('/data.json')
  //        .then((response) => console.log(response));
  // }, [])

  // let cursor;
  // const hoverEnterHandler = () => {
  //     cursor = "pointer";
  // };
  // const hoverExitHandler = () => {
  //   cursor = "grab";
  // };

  // const onClick = info => {
  //   if(info.object) {
  //     setToggle(true)
  //     //LEAVE TOGGLE AS TRUE AND CHANGE INFO FOR DISPLAY
  //     setLocationInfo(info.object)
  //     console.log(LocationInfo)
  //     // alert(info.object.name)
  //   }
  // }

  return (
    <Context.Provider
      value={{
        toggle, setToggle, locationInfo, setLocationInfo, categories, setCategories,
        selectCountry, setSelectCountry, allPoints, setAllPoints, data, setData,
        sensors, setSensors, selectSensor, setSelectSensor,
        selectCategory, setSelectCategory, countries, setCountries, contextStates
      }}
    >
      <div className='MainScreen'>
        <Scatterplot></Scatterplot>
        <FilterBox></FilterBox>
        {/* <Polygon></Polygon> */}
        <SideBar></SideBar>
      </div>
    </Context.Provider>
  );
}

export default App;

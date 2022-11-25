// import logo from './logo.svg';
import './App.css';
import {Context}  from './Context';

import Scatterplot from './layers/Scatterplot';
import Polygon from './layers/Polygon';

import axios from 'axios';
import {React, useState} from 'react';
import SideBar from './SideBar';

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

  const [Toggle, setToggle] = useState(false);
  const [LocationInfo, setLocationInfo] = useState();

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
    <Context.Provider value={{Toggle, setToggle, LocationInfo, setLocationInfo, contextStates}}>
    <div className='MainScreen'>
    <Scatterplot></Scatterplot>
    {/* <Polygon></Polygon> */}
    <SideBar></SideBar>
    </div>
    </Context.Provider>
  );
}

export default App;

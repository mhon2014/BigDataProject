// import logo from './logo.svg';
import './App.css';
import {Context}  from './Context';
import ScatterPlotLayer from './layers/ScatterPlotLayer';

import axios from 'axios';
import {React, useState} from 'react';
import SideBar from './SideBar';
import DeckGL from 'deck.gl';
import {LineLayer, ScatterplotLayer} from 'deck.gl';
import {Map} from 'react-map-gl';

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
const data = [
  // {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
  {name: 'Colma (COLM)', code:'CM', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [-122.466233, 37.684638]},
  {name: 'Colma (COLM)', code:'CM', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [-100.466233, 40.684638]},
  {name: 'Colma (COLM)', code:'CM', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [0.466233, 20.684638]},
  {name: 'Colma (COLM)', code:'CM', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [10.466233, 60.684638]},

];

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
    <ScatterPlotLayer></ScatterPlotLayer>
    <SideBar></SideBar>
    </div>
    </Context.Provider>
  );
}

export default App;

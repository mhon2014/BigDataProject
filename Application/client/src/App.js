import logo from './logo.svg';
import './App.css';
import { Context } from './Context';

import axios from 'axios';
import {React, useState, useContext} from 'react';
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

  // React.useEffect(() => {
  //   axios.get('/data.json')
  //        .then((response) => console.log(response));
  // }, [])

  // const layers = [
  //   new LineLayer({id: 'line-layer', data})
  // ];

  // let cursor;
  // const hoverEnterHandler = () => {
  //     cursor = "pointer";
  // };
  // const hoverExitHandler = () => {
  //   cursor = "grab";
  // };


  const onClick = info => {
    if(info.object) {
      setToggle(!Toggle)
      setLocationInfo(info.object)
      console.log(LocationInfo)
      // alert(info.object.name)
    }
  }

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data,
    pickable: true,
    // opacity: 0.8,
    // stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => d.coordinates,
    getRadius: d => Math.sqrt(d.exits),
    getFillColor: d => [255, 0, 0],
    getLineColor: d => [255, 0, 0],
    onClick
  });

  return (
    <Context.Provider value={{Toggle, setToggle}}>
    <div className='MainScreen'>
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layer}
      getCursor= {() => 'pointer'}
      doubleClickZoom = 'false'

      // getTooltip={({object}) => object && `${object.name}\n${object.address}`}
    >
    {/* <ScatterplotLayer id="scatter-layer" data={data} /> */}
    <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN}/>
    </DeckGL>
    <SideBar ToggleState={Toggle}></SideBar>
    </div>
    </Context.Provider>
  );
}

export default App;

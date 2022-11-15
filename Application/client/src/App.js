import logo from './logo.svg';
import './App.css';

import React from 'react';
import DeckGL from 'deck.gl';
import {LineLayer, ScatterplotLayer} from 'deck.gl';
import {Map} from 'react-map-gl';


// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.466233,

  // longitude: 0,
  latitude: 37.684638,
  // latitude: 0,
  zoom: 10,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  // {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
  {name: 'Colma (COLM)', code:'CM', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [-122.466233, 37.684638]},

];

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';

function App() {
  console.log(MAPBOX_ACCESS_TOKEN)

  // const layers = [
  //   new LineLayer({id: 'line-layer', data})
  // ];


  // const layer = [
  //   new ScatterplotLayer({
  //     id: 'scatterplot',
  //     data, // load data from server
  //     getPosition: d => d.coordinates,
  //     // getColor: d => color[d.type],
  //     getRadius: 25,
  //     opacity: 0.9,
  //     pickable: false,
  //     radiusMinPixels: 0.25,
  //     radiusMaxPixels: 30,
  //   }),
  // ];

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => d.coordinates,
    getRadius: d => Math.sqrt(d.exits),
    getFillColor: d => [255, 140, 0],
    getLineColor: d => [0, 0, 0]
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layer}
      // getTooltip={({object}) => object && `${object.name}\n${object.address}`}
    >
    {/* <ScatterplotLayer id="scatter-layer" data={data} /> */}
    <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

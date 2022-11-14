import logo from './logo.svg';
import './App.css';

import React from 'react';
import DeckGL from 'deck.gl';
import {LineLayer} from 'deck.gl';
import {Map} from 'react-map-gl';


// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWhvbjIwMTQiLCJhIjoiY2xhYjg0Y2p1MDY4NTNubW9wdzhqcnhvbyJ9.5zb8vso9uc_RBovpalCDNA';
const MAP_STYLE = 'mapbox://styles/mhon2014/clabk1xb8000l14p53vxq1h56';

function App({data}) {
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
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

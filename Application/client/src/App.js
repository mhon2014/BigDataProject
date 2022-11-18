import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import {React, useState} from 'react';
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

  const [PopUp, setPopUp] = useState();

  // React.useEffect(() => {
  //   axios.get('/data.json')
  //        .then((response) => console.log(response));
  // }, [])

  // const layers = [
  //   new LineLayer({id: 'line-layer', data})
  // ];



  const onClick = info => {
    if(info.object) {
      setPopUp(info.object)
      console.log(PopUp)
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
    <div className='MainScreen'>
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layer}
      // getTooltip={({object}) => object && `${object.name}\n${object.address}`}
    >
    {/* <ScatterplotLayer id="scatter-layer" data={data} /> */}
    <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
    <div className='popup'>
    test
    </div>
    </div>
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

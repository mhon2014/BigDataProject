import { React, useContext } from "react";
import { Context } from "../Context";

import DeckGL from "deck.gl";
import {PolygonLayer } from "deck.gl";
import { Map } from "react-map-gl";
// import FullData from 'FullData.json';


const file ="sampletestingdata.json";

export default function Polygon() {
  const {tgl, location, categories, contextStates} = useContext(Context);
  const [toggle, setToggle] = tgl;
  const [locationInfo, setLocationInfo] = location;
  const [category, setCategory] = categories

    async function getlocaldata() {
        // Use fetch API to get data
        return await fetch(file)
          .then((response) => response.json())
          .then((results) => {return results})
          .catch((error) => {
            // setError(error);
          });
      }

    const data = getlocaldata()
    

    const onClick = (info) => {
        if (info.object) {
        setToggle(true);
        //LEAVE TOGGLE AS TRUE AND CHANGE INFO FOR DISPLAY
        setLocationInfo(info.object);
        console.log(locationInfo);
        // alert(info.object.name)
        }
    };

    const layer = new PolygonLayer({
        id: "polygon-layer",
        data,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: (d) => d.geometry.coordinates,
        getElevation: (d) => d.population / d.area / 10,
        getFillColor: (d) => [d.population / d.area / 60, 140, 0],
        getLineColor: [80, 80, 80],
        getLineWidth: 1,
        onClick
    });

    return (
        <DeckGL
        initialViewState={contextStates.INITIAL_VIEW_STATE}
        controller={true}
        layers={layer}
        getCursor={() => "pointer"}
        doubleClickZoom="false"
        >
        <Map mapStyle={contextStates.MAP_STYLE} mapboxAccessToken={contextStates.MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
    );


}

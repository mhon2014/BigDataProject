import { React, useContext } from "react";
import { Context } from "../Context";

import DeckGL from "deck.gl";
import {ScatterplotLayer } from "deck.gl";
import { Map } from "react-map-gl";

const file ="FullDataReformatted.json";


export default function Scatterplot() {
    const { Toggle, setToggle, LocationInfo, setLocationInfo, contextStates } = useContext(Context);

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
        //query data
        setLocationInfo(info.object);
        console.log(LocationInfo);
        console.log(info.object)
        alert(info)
        }
    };

    const layer = new ScatterplotLayer({
        id: "scatterplot-layer",
        data,
        pickable: true,
        // opacity: 0.8,
        // stroked: true,
        filled: true,
        radiusScale: 100,
        radiusMinPixels: 1,
        radiusMaxPixels: 100,
        lineWidthMinPixels: 1,
        getPosition: (d) => d.coordinates,
        // getRadius: d => Math.sqrt(),
        getFillColor: (d) => [255, 0, 0],
        getLineColor: (d) => [255, 0, 0],
        onClick,
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

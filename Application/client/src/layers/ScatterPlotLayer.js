import { React, useContext } from "react";
import { Context } from "../Context";

import DeckGL from "deck.gl";
import {ScatterplotLayer } from "deck.gl";
import { Map } from "react-map-gl";

const data = [
  // {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
  {
    name: "Colma (COLM)",
    code: "CM",
    address: "365 D Street, Colma CA 94014",
    exits: 4214,
    coordinates: [-122.466233, 37.684638],
  },
  {
    name: "Colma (COLM)",
    code: "CM",
    address: "365 D Street, Colma CA 94014",
    exits: 4214,
    coordinates: [-100.466233, 40.684638],
  },
  {
    name: "Colma (COLM)",
    code: "CM",
    address: "365 D Street, Colma CA 94014",
    exits: 4214,
    coordinates: [0.466233, 20.684638],
  },
  {
    name: "Colma (COLM)",
    code: "CM",
    address: "365 D Street, Colma CA 94014",
    exits: 4214,
    coordinates: [10.466233, 60.684638],
  },
];


export default function ScatterPlotLayer() {
    const { Toggle, setToggle, LocationInfo, setLocationInfo, contextStates } = useContext(Context);

    const onClick = (info) => {
        if (info.object) {
        setToggle(true);
        //LEAVE TOGGLE AS TRUE AND CHANGE INFO FOR DISPLAY
        setLocationInfo(info.object);
        console.log(LocationInfo);
        // alert(info.object.name)
        }
    };

    const layer = new ScatterplotLayer({
        id: "scatterplot-layer",
        data,
        pickable: true,
        // opacity: 0.8,
        // stroked: true,
        filled: true,
        radiusScale: 1,
        radiusMinPixels: 10,
        radiusMaxPixels: 10,
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

        // getTooltip={({object}) => object && `${object.name}\n${object.address}`}
        >
        {/* <ScatterplotLayer id="scatter-layer" data={data} /> */}
        <Map mapStyle={contextStates.MAP_STYLE} mapboxAccessToken={contextStates.MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
    );
}

import { React, useContext, useEffect } from "react";
import { Context } from "../Context";

import DeckGL from "deck.gl";
import {PolygonLayer } from "deck.gl";
import { Map } from "react-map-gl";
// import FullData from 'FullData.json';


const file ="sampletestingdata.json";

export default function Polygon() {
    const {setToggle, locationInfo, setLocationInfo, setCategories, contextStates, setSelectFilter, setAllPoints, data, setData} = useContext(Context);

    useEffect(() => {
        async function getLocalData() {
          try {
            // Use fetch API to get data
            const response = await fetch(file);
            const result = await response.json();
            setAllPoints(result);
            setData(result);
    
            // Get distinct category names
            const distinctList = [...new Set(result.map(cat => cat.category))];
            let options = distinctList.map((cat) => ({
              value:cat, label:cat.replace(/_/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
            }))
    
            // sort categories alphabetically
            options.sort(function (a, b) {
              if (a.label < b.label) {
                return -1;
              }
              if (a.label > b.label) {
                return 1;
              }
              return 0;
            })
    
            // Contains all the categories
            setCategories(options);
    
            // contains filtered categories
            setSelectFilter(options);
          } catch (err) {
            console.log(err);
          }
        }
    
        getLocalData().catch(console.error);
        // eslint-disable-next-line
      }, [] );


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

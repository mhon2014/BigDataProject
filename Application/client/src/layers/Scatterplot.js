import {Context} from "../Context";

import React, {useContext, useEffect} from "react";
import {DeckGL, ScatterplotLayer} from "deck.gl";
import {Map} from "react-map-gl";

const file ="FilteringData.json";

export default function Scatterplot() {
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
      //query data
      setLocationInfo(info.object);
      console.log(locationInfo);
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

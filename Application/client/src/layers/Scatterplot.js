import {Context} from "../Context";

import React, {useContext, useEffect} from "react";
import {DeckGL, ScatterplotLayer} from "deck.gl";
import {Map} from "react-map-gl";

const file ="data.json";

const img_url_prefix = 'https://spacenet-dataset.s3.amazonaws.com/Hosted-Datasets/fmow/fmow-rgb/'

export default function Scatterplot() {
  const {setToggle,
    locationInfo,
    setLocationInfo,
    setCategories,
    setCountries,
    setSensors,
    contextStates,
    setSelectCategory,
    setSelectCountry,
    setSelectSensor,
    setAllPoints,
    data,
    setData
  } = useContext(Context);

  useEffect(() => {
    async function getLocalData() {
      try {
        // Use fetch API to get data
        const response = await fetch(file);
        const result = await response.json();

        // Fix country code
        result.map((r) => {
          if (r.country_code === 'CA-') {
            r.country_code = 'RUS';
          }
          if (r.country_code === 'KO-') {
            r.country_code = 'SRB';
          }
        });
        setAllPoints(result);
        setData(result);

        // Get distinct category names
        const distinctCategory = [...new Set(result.map(cat => cat.category))];

        // Configure for dropdown menu
        const option1 = distinctCategory.map((cat) => ({
          value:cat, label:cat.replace(/_/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
        }));

        // sort categories alphabetically
        option1.sort(function (a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });

        // Function to convert iso3 to iso2 then iso2 to country name
        const getCountryISO2 = require("country-iso-3-to-2");
        const getCountryNames = new Intl.DisplayNames(['en'], {type: 'region'});

        // Get country names
        const distinctCountry = [...new Set(result.map(cat => cat.country_code))];

        // Configure for dropdown menu
        let option2 = distinctCountry.map((country) => ({
          value:country, label: getCountryISO2(country)
        }));

        // Change label to country name
        option2.map((iso2) => {
          iso2.label = getCountryNames.of(iso2.label);
        });

        // Sorts alphabetically
        option2.sort(function (a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });

        // Get sensor data
        const distinctSensor = [...new Set(result.map(cat => cat.sensor_platform_name))];
        const option3 = distinctSensor.map((sensor) => ({
          value:sensor, label: sensor
        }));

        // Contains all the countries, categories, and sensors
        setCategories(option1);
        setCountries(option2);
        setSensors(option3);

        // contains filtered countries, categories, and sensors
        setSelectCategory(option1);
        setSelectCountry(option2);
        setSelectSensor(option3);
      } catch (err) {
        console.log(err);
      }
    }

    getLocalData().catch(console.error);
    // eslint-disable-next-line
  }, [] );


  const buildUrl = (object) => {
    const num = (object.img_filename.match(/\d+/g) || []).map(n => parseInt(n))
    const category = object.category
    const set = object.set
    
    const url = img_url_prefix + set + '/' + category + '/' + category + '_' + num[0] + '/' + category + '_' + num[0] + '_' + num[1]
    // console.log(image_url)
    return url
}


   async function onClick(info) {
    if (info.object) {
      setToggle(true);
      //LEAVE TOGGLE AS TRUE AND CHANGE INFO FOR DISPLAY
      //query data
      const url = buildUrl(info.object) + '_rgb.json'
      const image_url_link = buildUrl(info.object) + '_rgb.jpg'
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      
      setLocationInfo({...result, image_url:image_url_link});

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
      getCursor={() => "crosshair"}
      doubleClickZoom="false"
    >
      <Map mapStyle={contextStates.MAP_STYLE} mapboxAccessToken={contextStates.MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

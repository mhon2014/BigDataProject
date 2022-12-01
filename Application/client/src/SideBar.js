import './Sidebar.css';
import { Context } from './Context';
import {useSpring, animated} from 'react-spring'

import {useContext} from "react";
// ${ToggleState?'sidebarActive':null}`

    const img_url_prefix = 'https://spacenet-dataset.s3.amazonaws.com/Hosted-Datasets/fmow/fmow-rgb/'

export default function SideBar() {
    const {Toggle, setToggle, LocationInfo, setLocationInfo, contextStates} = useContext(Context);

    const translate = useSpring({
        transform: Toggle ? `translateX(0%)` : `translateX(100%)`
        // transition: 'background 0.1s'
    });


    
    const buildUrl = () => {
        const num = (LocationInfo.img_filename.match(/\d+/g) || []).map(n => parseInt(n))
        const category = LocationInfo.category
        const set = LocationInfo.set
        
        const image_url = img_url_prefix + set + '/' + category + '/' + category + '_' + num[0] + '/' + category + '_' + num[0] + '_' + num[1] + '_msrgb.jpg' 

        return image_url

    }

    const close = () => {
        setToggle(false)
    }
    
  return (
    <animated.div className='sidebar' style={translate}>
    <button name='close' onClick={close} >X</button>
    <div>
    {LocationInfo != null && <img
    src={buildUrl}
              onError={(e) => (
                (e.target.onerror = null),
                (e.target.src = "")
              )}
              aria-label="image"
            ></img>
    }
    {/* <ul>{LocationInfo.name}</ul> */}
    </div>
    {console.log(Toggle)}
    
    </animated.div>
  );
}

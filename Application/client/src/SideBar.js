import { Context } from './Context';

import './Sidebar.css';

import {useContext} from "react";
import {useSpring, animated} from 'react-spring'
// ${ToggleState?'sidebarActive':null}`

    const img_url_prefix = 'https://spacenet-dataset.s3.amazonaws.com/Hosted-Datasets/fmow/fmow-rgb/'

export default function SideBar() {
  const {toggle, setToggle, locationInfo} = useContext(Context);

  const translate = useSpring({
    transform: toggle ? `translateX(0%)` : `translateX(100%)`
    // transition: 'background 0.1s'
  });


    
    const buildUrl = () => {
        const num = (locationInfo.img_filename.match(/\d+/g) || []).map(n => parseInt(n))
        const category = locationInfo.category
        const set = locationInfo.set
        
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
    {locationInfo != null && <img
    src={locationInfo.image_url}
              onError={(e) => (
                (e.target.onerror = null),
                (e.target.src = "")
              )}
              aria-label="image"
            ></img>
    }
    {/* <ul>{LocationInfo.name}</ul> */}
    </div>
    </animated.div>
  );
}

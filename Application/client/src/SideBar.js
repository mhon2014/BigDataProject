import { Context } from './Context';

import './Sidebar.css';

import {useContext} from "react";
import {useSpring, animated} from 'react-spring'
// ${ToggleState?'sidebarActive':null}`

export default function SideBar() {
  const {tgl, location, categories, contextStates} = useContext(Context);
  const [toggle, setToggle] = tgl;
  const [locationInfo, setLocationInfo] = location;
  const [category, setCategory] = categories

    const translate = useSpring({
        transform: toggle ? `translateX(0%)` : `translateX(100%)`
        // transition: 'background 0.1s'
    });

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

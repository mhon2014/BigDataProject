import './Sidebar.css';
import { Context } from './Context';
import {useSpring, animated} from 'react-spring'

import {useContext} from "react";
// ${ToggleState?'sidebarActive':null}`

export default function SideBar() {
    const {Toggle, setToggle, LocationInfo, setLocationInfo, contextStates} = useContext(Context);

    const translate = useSpring({
        transform: Toggle ? `translateX(0%)` : `translateX(100%)`
        // transition: 'background 0.1s'
    });

    const close = () => {
        setToggle(false)
    }
    
  return (
    <animated.div className='sidebar' style={translate}>
    <button name='close' onClick={close} >X</button>
    <div>
    {LocationInfo != null && <img
    src={LocationInfo.image_url}
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

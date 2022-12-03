import { Context } from './Context';

import './Sidebar.css';

import {useContext} from "react";
import {useSpring, animated} from 'react-spring'
// ${ToggleState?'sidebarActive':null}`

export default function SideBar() {
  const {toggle, setToggle, locationInfo} = useContext(Context);

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
        <div id='imageDiv'>
        {locationInfo != null && <img
        src={locationInfo.image_url}
                onError={(e) => (
                    (e.target.onerror = null)
                    (e.target.src = "")
                )}
                aria-label="image"
                ></img>
        }
        {/* <ul>{LocationInfo.name}</ul> */}
        </div>
        <div id='dataInfo'>
            {
                Object.keys(locationInfo).map( 
                    (key, value) => <li>{key}:{locationInfo[key]}</li> )
            }
        </div>
    </div>
    </animated.div>
  );
}

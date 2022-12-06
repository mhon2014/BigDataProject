import { Context } from "./Context";

import "./Sidebar.css";

import { useContext } from "react";
import { useSpring, animated } from "react-spring";
// ${ToggleState?'sidebarActive':null}`

export default function SideBar() {
  const { toggle, setToggle, locationInfo } = useContext(Context);

  const translate = useSpring({
    transform: toggle ? `translateX(0%)` : `translateX(100%)`,
    // transition: 'background 0.1s'
  });

  const close = () => {
    setToggle(false);
  };

  // const renderrecursive = (nested) => {
  //     return nested.map((item) => (
  //         <div>
  //             {item.title}
  //             {item.child && renderrecursive(item.child)}
  //         </div>
  //     ))
  //   }

  return (
    <animated.div className="sidebar" style={translate}>
      <button name="close" onClick={close}>
        X
      </button>
      <div className="inner-sidebar">
        <div id="imageDiv">
          {locationInfo != null && (
            <img
              src={locationInfo.image_url}
              onError={(e) => (e.target.onerror = null)((e.target.src = ""))}
              aria-label="image"
            ></img>
          )}
          {/* <ul>{LocationInfo.name}</ul> */}
        </div>
        <div id="dataInfo">
          <table>
            {Object.keys(locationInfo).map((key, index) => (
             index < 6 ?
              (<tbody key={key}>
                    <tr>
                    <td >
                        <b>{key}:</b>
                    </td>
                    <td className="content">{locationInfo[key]}</td>
                    </tr>
                </tbody>
              ) : null
            ))}
          </table>
          <p>
            <b>coordinates:</b> <br/>
            {locationInfo["coordinates"][0]}, {locationInfo["coordinates"][1]}
          </p>
          <p id="image-link">
            <b>Image Url:</b> <br/>
            <a href={locationInfo["image_url"]}>{locationInfo["image_url"]}</a>
          </p>
          <p id="url-link">
            <b>JSON url:</b> <br/>
            <a href={locationInfo["url"]} >{locationInfo["url"]}</a>
          </p>
        </div>
      </div>
    </animated.div>
  );
}

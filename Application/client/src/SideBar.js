import './Sidebar.css';
import { Context } from './Context';

import { react, useState, useContext} from "react";
// ${ToggleState?'sidebarActive':null}`

export default function SideBar() {
    const {Toggle, setToggle} = useContext(Context);

    const close = () => {
        setToggle(!Toggle)
    }
    
  return (
    <div className={`sidebar ${Toggle?'sidebarActive':null}`}>
    <button name='close' onClick={close} >X</button>
    {console.log(Toggle)}
    test
    </div>
  );
}

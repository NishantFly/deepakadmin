import React, { useState } from "react";

import {
ProSidebar,
Menu,
MenuItem,
SidebarHeader,
SidebarFooter,
SidebarContent,
SubMenu,
} from "react-pro-sidebar";
import "./Sidebar.css"


import { FaList, FaRegHeart,FaUserPlus } from "react-icons/fa";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import { IoIosDocument } from "react-icons/io";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle ,FiUserPlus,FiUser} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";

import "react-pro-sidebar/dist/css/styles.css";
const Sidebar= (props) => {

const [menuCollapse, setMenuCollapse] = useState(false)
const UserToken = localStorage.getItem("userToken");
const menuIconClick = () => {

menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
};
return (
<>
<div id="header">
{/* collapsed props to change menu size using menucollapse state */}
<ProSidebar collapsed={menuCollapse}>
<SidebarHeader>
<div className="logotext">
{/* Icon change using menucollapse state */}
<p>{menuCollapse ? <GiAbstract050 /> : <SiApacheairflow /> }</p>
</div>
<div className="closemenu" onClick={menuIconClick}>
{/* changing menu collapse icon on click */}
{menuCollapse ? (
<FiArrowRightCircle/>
) : (
<FiArrowLeftCircle/>
)}
</div>
</SidebarHeader>
<SidebarContent>
<Menu iconShape="square">
<MenuItem onClick={() => props.history.push("/home")} active={true} icon={<FiHome />}>
Home
</MenuItem>
<SubMenu title="User" icon={<FaUserPlus />}>
<MenuItem onClick={() => props.history.push("/user")} icon={<FiUser />}>
User
</MenuItem>
<MenuItem onClick={() => props.history.push("/otp/send")} icon={<FiUser />}>
User Add
</MenuItem>
<MenuItem onClick={() => props.history.push("/user/login")} icon={<FiUserPlus />}>
User Login
</MenuItem>
</SubMenu>
<MenuItem onClick={() => props.history.push("/admin/documents")} icon={<IoIosDocument />}>
Documents
</MenuItem>
<MenuItem onClick={() => props.history.push("/admin/insurance")} icon={<BsFillFileEarmarkMedicalFill />}>
insurance
</MenuItem>

<MenuItem onClick={()=> props.history.push("/get/vehicle")}icon={<RiPencilLine />}>Vehicle</MenuItem>
<MenuItem onClick ={()=> props.history.push("/get/station")}icon={<BiCog />}>Station</MenuItem>
</Menu>
</SidebarContent>
<SidebarFooter>
<Menu iconShape="square">
<MenuItem  onClick={() => {
localStorage.removeItem("userToken");
props.history.push("/home")}}icon={<FiLogOut />}>
User Logout
</MenuItem>
</Menu>
</SidebarFooter>
</ProSidebar>
</div>
</>
);
}
export default Sidebar
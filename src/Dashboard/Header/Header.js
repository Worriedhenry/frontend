import React, { useEffect, useState } from "react";
import "./Header.css"
import { Badge, ButtonGroup, IconButton } from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate,useSearchParams } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios";
import logo from './logo.png'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
function Header(props){
    const navigate=useNavigate()
    const [BadgeContent, setBC] =useState(0)
    const [searchParams,setSearchParam]=useSearchParams()
    const [Rooms,setRooms]=useState(0)
    useEffect(() => {
        // console.log(props)
        axios.post("https://backend-production-c9c7.up.railway.app/notifications",{name:searchParams.get("name")}).then((e)=>{
            if(e.data.array===undefined){
                setBC(0)
            }
            else{
            setBC(e.data.array.length)
            }
        })
        },[searchParams,Rooms]);
    const clicked=()=>{
        navigate('/notification?name='+searchParams.get("name"))
    }
    const chat=()=>{
        navigate('/chats?name='+searchParams.get("name")+'&comm=null')
    }
    const Cam=()=>{
        navigate('/peer?name='+searchParams.get("name")+'&comm=null')
    }
    props.socket.on("refresh",()=>{
        console.log("renderri")
        setRooms(Rooms+1)
      })
    // const [arr,setArr]=useState([{name:"ChatBot",id:6969}])
    const style={"position":"relative","top":"16px","color":"white",'overflow':'visible'}
    return <div className="Header-container">
        <img className="logo" src={logo} alt=""></img>
        <div style={{marginRight:'1%'}} >
        <IconButton onClick={chat}>
       <Badge  aria-label="Chats"  badgeContent={0} style={style} max={9}><ChatIcon/></Badge></IconButton>
        <IconButton onClick={clicked}>
       <Badge  style={style} badgeContent={BadgeContent} showZero max={99}><NotificationsNoneIcon/></Badge></IconButton>
        <IconButton onClick={Cam}>
       <Badge  style={style} variant="dot" showZero max={99}><VideoCameraFrontIcon/></Badge></IconButton>
       
       </div>
    </div>
}

export default Header
import React, { useEffect, useState } from "react";
// import io from 'socket.io-client';
import Msg from "./messages";
import Error from "./Errors/NoCommunity ";
import Header from "../../Dashboard/Header/Header";
import LeftGuard from "../../Dashboard/LeftGuard/LeftGuard";
import {useSearchParams} from "react-router-dom";
import axios from "axios"
import AxiosLink from "./AxiosLin";
// const connection_url = 'http://localhost:3001';
// const socket = io(connection_url, { transport: ['websocket'] });

function SocketHandler({socket}){
    const [searchParams,setSearchParams]=useSearchParams()
    const [Comm,setComm]=useState([])
    const [Rooms,setRomms]=useState([])
    const [error,setError]=useState(100)
    const [isAdmin, setAdmin] = useState(0);
    socket.emit("AssignUser",{naam:searchParams.get("name"),comm:searchParams.get("comm")})
    useEffect(()=>{
      async function admin(){
        let res=await axios.post(AxiosLink+"/isadmin",{comm:searchParams.get("comm"),user:searchParams.get("name")})
        console.log(res.data)
        if(res.data.error===200){
          setAdmin(1)
        }
        else{
        setAdmin(0)}
    }
    admin()
        axios
        .post(AxiosLink+"/comm",{name:searchParams.get("name"),comm:searchParams.get("comm")})
        .then(function (response) {
          setError(response.data.error)
          setComm(response.data.comm)
          if(response.data.error===200){
          setRomms(response.data.room)
        }
        });

    },[searchParams,setSearchParams])
    if(error===200){
    return <div className="App"><Header socket={socket} /><div style={{"display":"flex"}}><LeftGuard socket={socket} Communities={Comm} name={searchParams.get("name")} comm={searchParams.get("comm")} /><Msg isAdmin={isAdmin} socket={socket} Rooms={Rooms}  name={searchParams.get("name")} comm={searchParams.get("comm")} Communities={Comm} /></div></div>}
    return <div className="App"><Header socket={socket} /><div style={{"display":"flex",'height':'100%'}}><LeftGuard socket={socket} Communities={Comm} name={searchParams.get("name")} comm={searchParams.get("comm")} /><Error isAdmin={isAdmin} socket={socket} Rooms={Rooms}  name={searchParams.get("name")} comm={searchParams.get("comm")} Communities={Comm} /></div></div>
}

export default SocketHandler
import React,{useState,useEffect} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid} from '@mui/material/';
import Header from './Header/Header';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useSearchParams} from 'react-router-dom'
import LeftGuard from './LeftGuard/Left';
import NotisCard from '../Mzzzezs/hooks/NotisCards';
import Error from '../Mzzzezs/hooks/Errors/NoCommunity ';
import Errors from '../Mzzzezs/hooks/Errors/Errors';
export default function NotificatioinContainer({socket}) {
  const [searchParams,setSearchParams]=useSearchParams()
  const [Noti,setNotis]=useState([])
  const [Rooms,setRomms]=useState(1)
  const [error,setError]=useState(100)
  socket.on("refresh",()=>{
    setRomms(Rooms+1)
  })
  useEffect(()=>{
    console.log(searchParams.get("name"))
      axios
      .post("http://localhost:3001/notifications",{name:searchParams.get("name")})
      .then(function (response) {
        setError(response.data.error)
        setNotis(response.data.array)
      });
  },[searchParams,setSearchParams,Rooms])
  const refresh=()=>{
    setRomms(Rooms+1)
  }
  if(error===200){
  return <div className="App"><LeftGuard socket={socket} name={searchParams.get("name")} comm={searchParams.get("comm")} /><div><Header socket={socket} />
  <Button color="primary" onClick={refresh} variant="outlined">Refresh</Button>
  {Noti.map((e)=>(
    <NotisCard socket={socket} obj={e} />
  ))}</div></div>
                }
  return <div className="App"><LeftGuard  socket={socket}  name={searchParams.get("name")} comm={searchParams.get("comm")} /><div><Header socket={socket} /><div style={{"color":"#0d47a1"}}><Button color="primary" variant="outlined" onClick={refresh}>Refresh</Button>{Errors[999]}</div></div></div>
}

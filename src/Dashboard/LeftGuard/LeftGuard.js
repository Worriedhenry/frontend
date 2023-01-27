import { Button, ButtonGroup, MenuItem, Select,InputLabel } from "@mui/material"
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { FormControl } from "@mui/material"
import "./LeftGuard.css"
import axios from "axios"
function LeftGuard(props){
    useEffect(()=>{
        console.log(props)
    })
    const [comm,setComm]=useState("comm 1")
    const [commType,setCommType]=useState("Select Community")
    const [Alert,setAlert]=useState("none")
    const navigate=useNavigate()
    const clicked=(e)=>{
        // console.log("hi")
        setComm(e)
        navigate(`/chats?name=${props.name}&comm=${e}`)  
    }
    const navigateCreate=()=>{
        navigate('/create?name='+props.name+'&comm='+props.comm)
    }
    const navigateJoin=()=>{
        navigate('/join?name='+props.name+'&comm='+props.comm)
    }
    const Leave=()=>{
        setAlert("block")
    }
    const LeaveCanceld=()=>{
        setAlert("none")
    }
    const LeaveConformed=()=>{
        setAlert("none")
        axios.post("https://backend-production-c9c7.up.railway.app/LeaveConformed",{user:props.name,comm:props.comm})
        navigate("/chats?name="+props.name)
    }
    if(props.Communities===[]){
        return <div className="leftGuard-Container">
        <img className="logo" src="" alt=""></img>
        <p style={{"width":"100%","height":"0.4vh","backgroundColor":"#1976d2"}}></p>
        <ButtonGroup orientation="vertical" style={{"margin":"10px"}}>
            <Button style={{"color":"white"}} onClick={navigateCreate}>Create Community</Button>
            <Button style={{"color":"white"}} onClick={navigateJoin}>Join Community</Button>
            <Button>No Community Joined yet</Button>
            <Button style={{"color":"white"}}>Leave Community</Button>
        </ButtonGroup>
    </div>
    }
    return <div className="leftGuard-Container">
        <img className="logo" src="https://images-platform.99static.com//b6HxR1x9W8MIaq136g2mfhyVm6U=/224x2209:809x2794/fit-in/590x590/99designs-contests-attachments/114/114944/attachment_114944189" alt=""></img>
        <p style={{"width":"100%","height":"0.4vh","backgroundColor":"#1976d2"}}></p>
        <ButtonGroup orientation="vertical" style={{"margin":"10px"}}>
            <Button style={{"color":"white"}} onClick={navigateCreate}>Create Community</Button>
            <Button style={{"color":"white"}} onClick={navigateJoin}>Join Community</Button>.
            <select style={{"padding":"9px","width":"100%","color":"white","border":"3px solid #0d47a1","background":"transparent","textAlign":"center"}} value={comm} onChange={(e)=>clicked(e.target.value)}>
                <option style={{"background":"#1a237e"}} default >Select Community</option>
                {props.Communities.map((e)=>(
                    <option style={{"background":"#1a237e"}} >{e}</option>
                ))    }    </select> 
            <Button style={{"color":"white"}} onClick={Leave}>Leave Community</Button>
        </ButtonGroup>
        <div style={{"color":"white","display":Alert}}>
            <p>Do you want to leave {props.comm}</p>
            <ButtonGroup>
                <Button color="success" onClick={LeaveConformed} variant="outlined">Leave</Button>
                <Button color="error" onClick={LeaveCanceld} variant="outlined">Cancle</Button>
            </ButtonGroup>
        </div>
    </div>
}
export default LeftGuard
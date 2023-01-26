import { Button, ButtonGroup, MenuItem, Select,InputLabel } from "@mui/material"
import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import "./LeftGuard.css"
// import {useSearchParams} from 'react-router-dom'
function Left(props){
    const [comm,setComm]=useState("comm 1")
    const navigate=useNavigate()
    const clicked=(e)=>{
        setComm(e)
        navigate(`/?name=${props.name}&comm=${e}`)
    }
    return <div className="leftGuard-Container">
        <img className="logo" src="https://images-platform.99static.com//b6HxR1x9W8MIaq136g2mfhyVm6U=/224x2209:809x2794/fit-in/590x590/99designs-contests-attachments/114/114944/attachment_114944189" alt=""></img>
        <p style={{"width":"100%","height":"0.4vh","backgroundColor":"#1976d2"}}></p>
        <ButtonGroup  orientation="vertical" style={{"margin":"10px"}}>
            <Button  style={{"color":"white"}}>Create Community</Button>
            <select disabled style={{"padding":"8px","width":"100%","color":"white","border":"3px solid #0d47a1","background":"transparent","textAlign":"center"}} value={comm} onChange={(e)=>clicked(e.target.value)}>
            <option style={{"background":"#1a237e"}} >Comm 1</option>
            <option default >Comm 2</option>
            <option  >Comm 3</option>
            <option  >Comm 4</option>
        </select> 
            <Button style={{"color":"white"}}>Leave Community</Button>
        </ButtonGroup>
    </div>
}
export default Left
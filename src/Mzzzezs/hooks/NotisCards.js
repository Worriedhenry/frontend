import { ButtonGroup,Button, IconButton } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
export default function NotisCard(props){
    const style={"width":"20vw","color":"white","backgroundColor":"black","margin":"10px"}
    console.log(props.obj)
    const [searchParams,setSearchParam]=useSearchParams()
    const accepted =async()=>{
        axios.post("https://backend-production-c9c7.up.railway.app/CommReqAccept",{from:props.obj.from,for:props.obj.for,id:props.obj._id,Admin:searchParams.get("name")})
        props.socket.emit("EmitRefresh")
    }
    const rejected =async()=>{
        axios.post("https://backend-production-c9c7.up.railway.app/CommReqReject",{from:props.obj.from,for:props.obj.for,id:props.obj._id,Admin:searchParams.get("name"),type:props.obj.format})
        props.socket.emit("EmitRefresh")
    }
    if(props.obj.format==="request"){
        return <div style={style}>
            <p>{props.obj.msg}</p>
            <ButtonGroup>
                <Button onClick={accepted} color="success">Accept</Button>
                <Button onClick={rejected} color="error">Reject</Button>
            </ButtonGroup>
        </div>
    }
    if(props.obj.format==="notification"){
        return <div style={style}>
            <div>{props.obj.msg} <IconButton onClick={rejected} color="error"><CloseIcon /></IconButton></div>
        </div>
    }

}
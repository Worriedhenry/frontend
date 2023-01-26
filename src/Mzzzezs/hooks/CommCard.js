import React, { useState,useEffect } from "react";
import FaceIcon from '@mui/icons-material/Face';
import { Badge, Button,IconButton } from "@mui/material";
import {useSearchParams} from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';

function MsgFormat(props){
    const [likes,setlikes]=useState(props.likess)
    const [searchParams, setSearchParams] = useSearchParams();
    const [liked,setLiked]=useState(false)
    const [clicked,setClicked]=useState(false)
    const style = { color: "white", fontSize: "2vh" }
    const style2 = { color: "white", fontSize: "3vh" }
    const classes = `useForm-FormatedMsg ${props.side}`
    const classe=`useForm-container ${props.side}`
    var heartColor="standard"
    const showLiked=()=>{
        if(liked===false){
            setLiked(true)
            return
        }
        setLiked(false)
    }
    const CountLikes=()=>{
        if(clicked===false){
            heartColor="primary"
            setClicked(true)
            setlikes([...likes,searchParams.get("name")])
        }
        else{
            setClicked(false)
            setlikes(likes.filter(item => item !==searchParams.get("name")))
        }
        props.socket.emit("liked",{likes:[...likes,searchParams.get("name")],id:props.id,room:props.room,comm:searchParams.get("comm")})
    }
    useEffect(()=>{
        console.log("rendering",props.likess,likes)
        setlikes(props.likess)
    })
    if(liked===false){
        return <div className={classe}><div className={classes}>
        <Button startIcon={<FaceIcon style={style2}></FaceIcon>} style={style} size={"small"}>{props.name}</Button>
        <p style={{"padding":"10px"}} className="m0p0">{props.msg}</p>
        <p className="msg-time">{props.time}</p>
        
    </div>
    {/* <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} style={{"width":"3vw"}} color="primary" overlap="circular" showZero badgeContent={likes.length}><IconButton color={heartColor} onKeyUp={showLiked} onClick={CountLikes}  size="small"><FavoriteIcon/></IconButton></Badge> */}
  </div>
}
return <div className={classe}><div className={classes}>
<Button startIcon={<FaceIcon style={style2}></FaceIcon>} style={style} size={"small"}>{props.name}</Button>
<p style={{"paddingLeft":"10px"}} className="m0p0">{props.msg}</p>
<p className="msg-time">{props.time}</p>

</div>

</div>

    
}
export {MsgFormat}
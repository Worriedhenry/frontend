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
    const style = { color: "white", fontSize: "52%",margin:'0px',padding:'0px'}
    const style2 = { color: "white", fontSize: "202%" }
    const classes = `useForm-FormatedMsg ${props.side}`

return <div className={classes}>
<Button startIcon={<FaceIcon style={style2}></FaceIcon>} style={style} size={"small"}>{props.name}</Button>
<p  className="Msg-structure">{props.msg}</p>
<p className="msg-time">{props.time}</p>

</div>
}
export {MsgFormat}
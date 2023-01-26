import React, { useEffect, useState,useRef } from 'react';
import {TextField,Button, IconButton, ButtonGroup, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import {MsgFormat} from './Cards';
import {useSearchParams,useNavigate} from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import axios from 'axios';
const Sender = (props) => {
    const Navigate=useNavigate()
    const style = { color: "white", fontSize: "1.5vh" }
    const date = new Date();
    const showTime = date.getHours() 
    + ':' + date.getMinutes() 
//     // var Bot={"name":"ChatBot","msg":"Wow! So empty","side":"left","time":showTime,likes:["ChatBot"]}
    const [searchParams, setSearchParams] = useSearchParams();
	const [messages, setMessages] = useState('');
	const [Alert, setAlert] = useState("none");
    const [RoomType, setRT] =useState("")
    const [RoomName, setRN] =useState("")
    const [arr, setArr] =useState([])
    const [BadgeContent, setBC] =useState(0)
    const messagesEndRef = useRef(null)
    const [Rooms,setRooms]=useState(0)

const AddRoom=()=>{
    setAlert("block")
}
useEffect(()=>{
    clicked("General")
},[])
const cancleDeletion=()=>{
    setAlert("none")
}
props.socket.on("recieve",(e)=>{
        var obj={
            "name":e.from,
            "msg":e.messages,
            "side":e.class,
            "time":e.time,
            "likes":e.likes,
            id:e.id
        }
        setArr([...arr,obj])
    })
       props.socket.on("Update Like",(data)=>{
        // console.log(data,arr)
        let array=arr
            setArr(array.map(e=>{
                if(e.id===data.id){
                    console.log(e.likes,data.likes)
                    e.likes=data.likes
                    return e
                }
                return e
            }))
            // console.log(arr)
       })
        props.socket.on("New User Joined",(e)=>{
            const unique_id = uuid();
            let obj={
                "name":"ChatBot",
                "msg":`${e.name} has joined the chat`,
                "side":"left",
                "time":showTime,
                "likes":["ChatBot"],
                id:unique_id
            }
            setArr([...arr,obj ])
        }) 
        props.socket.on("refresh",()=>{
            console.log("renderri")
            setRooms(Rooms+1)
          })
	const onSubmit = (e) => {
        e.preventDefault();
        const unique_id = uuid();
        var object={"name":"You","msg":messages,"side":"right","time":showTime,"likes":["ChatBot"],id:unique_id}
        setArr([...arr,object])
		props.socket.emit('send', {
            messages:messages,from:searchParams.get("name"),class:"left",room:select,"name":searchParams.get("name"),"time":showTime,"likes":["ChatBot"],id:unique_id,comm:props.comm
		});
        setMessages("")
	};
    const [previos,setPrevios]=useState('General')
    const [select,setSelect]=useState("General")
    const clicked=(value)=>{
        const unique_id = uuid();
        var obj={
            "name":"ChatBot",
            "msg":`Welcome to ${value}`,
            "side":"left",
            "time":showTime,
            "likes":["ChatBot"],
            id:unique_id
        }
        setSelect(value)
        props.socket.emit("RoomChange",{"room":value,"name":searchParams.get("name"),"prev":previos,comm:props.comm})
        setPrevios(value)
        setArr([obj])
    }
    const handleRoom=(e)=>{
        setRT(e)
        // console.log(e)
    }
    const GenerateRoom=async()=>{
        if(RoomName==="" || RoomType===""){
            return
        }
        axios.post("http://localhost:3001/GenerateRooms",{username:searchParams.get('comm'),Class:RoomType,RoomName:RoomName})
        console.log("socketted")
        props.socket.emit("EmitRefresh")
        setAlert("none")
        // Navigate("/chats?name="+searchParams.get("name")+"&comm="+searchParams.get("comm"))
    }
    if(props.isAdmin===true){
        return (
            <>      <div className='container-contain'>
                    <div style={{"padding":"8px","width":"100%"}} id="scroll" ref={messagesEndRef}>
                        <select style={{"padding":"8px","width":"50%","color":"#0d47a1","border":"3px solid #0d47a1"}} value={select} onChange={(e)=>clicked(e.target.value)}>
                        {props.Rooms.map((e)=>(
                            <option>{e}<AddBoxIcon/></option>
                        ))}
                    </select>
                    <IconButton color="primary" onClick={AddRoom} size='large'><AddBoxIcon size='large' /></IconButton>
                    <IconButton color="error"  size='large'><DeleteIcon size='large' /></IconButton>
                    </div>
                    <div className='hidden-mist' style={{"display":Alert}}><TextField onChange={(e)=>setRN(e.target.value)}  size="small" variant="outlined" label="Enter Room Name"  ></TextField>
                    <p> <FormControl  >
                        {/* <InputLabel id="type">Room Type</InputLabel> */}
                        <Select variant="outlined" value={RoomType}  fullWidth size='large' style={{"width":"16vw","padding":"0px"}}  onChange={(e)=>handleRoom(e.target.value)} >
                            <MenuItem value={"ChatRooms"}>ChatRooms</MenuItem>
                            <MenuItem value={"VoiceRooms"}>VoiceRooms</MenuItem>
                            <MenuItem value={"VedioRooms"}>VedioRooms</MenuItem>
                        </Select>
                    </FormControl></p>
                    <ButtonGroup>
                        <Button color="success" onClick={GenerateRoom}>Create</Button>
                        <Button onClick={cancleDeletion} color="error">Cancel</Button>
                    </ButtonGroup>
                    </div >
                    <div className='msges'>
                {arr.map((e,index)=> <MsgFormat socket={props.socket} key={index} room={select} name={e.name} msg={e.msg} side={e.side} time={e.time} likess={e.likes} id={e.id} />)}
                </div>
                 </div>
                    {/* <div className='msgconatiner'></div> */}
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField id="fullWidth" style={style} size="small" variant="filled" label="Type Message" value={messages} color="primary" onChange={e=>setMessages(e.target.value)}></TextField>
                    <Button type='submit' size="large" variant="contained">Send</Button></Box>
            </>
                )
                } 
    // return <><p></p></>
return (
<>      <div className='container-contain'>
<div style={{"padding":"8px","width":"100%"}} id="scroll" ref={messagesEndRef}><select style={{"padding":"8px","width":"50%","color":"#0d47a1","border":"3px solid #0d47a1"}} value={select} onChange={(e)=>clicked(e.target.value)}>
{props.Rooms.map((e)=>(
    <option>{e}</option>
))}
</select><IconButton disabled color="primary" onClick={AddRoom} size='large'><AddBoxIcon size='large' /></IconButton> </div>
<div className='hidden-mist' style={{"display":Alert}}>
                    <TextField  size="small" variant="outlined" label="Enter Room Name"  ></TextField>
                    <FormControl >
                        <InputLabel>Room Type</InputLabel>
                        <Select value="ChatRomms" label="Room Type" onChange={handleRoom}>

                        </Select>
                    </FormControl>
                    <p><TextField  size="small" variant="outlined" label="Enter Room Name"  ></TextField></p>
                    <ButtonGroup>
                        <Button color="success" >Request</Button>
                        <Button onClick={cancleDeletion} color="error">Cancel</Button>
                    </ButtonGroup>
                    </div>
{arr.map((e,index)=> <MsgFormat socket={props.socket} key={index} room={select} name={e.name} msg={e.msg} side={e.side} time={e.time} likess={e.likes} id={e.id} />)}

</div>
{/* <div className='msgconatiner'></div> */}
<TextField id="fullWidth" style={style} size="small" variant="filled" label="Type Message" value={messages} color="primary" onChange={e=>setMessages(e.target.value)}></TextField>
<Button onClick={(e)=>onSubmit(e)} size="large" variant="contained">Send</Button>
</>
)
} 

export default Sender; 
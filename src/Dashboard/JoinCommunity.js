import React,{useState,useEffect} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid} from '@mui/material/';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate,useSearchParams} from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
// import Error from '../errors';
import Errors from '../Mzzzezs/hooks/Errors/Errors';

export default function JoinCommunity() {
    const navigate=useNavigate()
    const [request,setRequest]=useState('Join')
    const [searchParams, setSearchParams] = useSearchParams();
    const [CommName,setPhone]=useState('')
    const [Comms,setComs]=useState([{name:"Search Communities"}])
    const [error,setError]=useState(100)
    var array=["No communities"]

    useEffect(()=>(
        sessionStorage.clear()

    ))
        const GetComms=async (e)=>{
            let result= await axios.post('http://localhost:3001/createe',{name:e})
            array=result.data.data
            setComs(result.data.data)
            setPhone(e)
        }
    const joinComm =async (e,name)=>{
        let result= await axios.post('http://localhost:3001/join',{comm:name,name:searchParams.get("name")})
        console.log(result.data.error)
        if(result.data.error!==200){
          setError(result.data.error)
          setTimeout(()=>{
            setError(100)
          },3000)
        }
        else{navigate('/chats?name='+searchParams.get("name")+'&comm='+searchParams.get("comm"))}
    }
    
  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Join Community
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={(e) =>GetComms(e.target.value)}
              value={CommName}
              label="Community Name"
              name=""
              autoComplete="email"
              autoFocus
            />
            <div>
                {Comms.map((e)=>
                    (<div className="commcard"><Button style={{"color":"white"}}  startIcon={<GroupsIcon />}  >{e.username}</Button> 
                    <Button style={{"color":"white"}} onClick={(el)=>joinComm(el.target,e.username)}>{request}</Button></div>)
                )}
            </div>
            <Typography component="h5" color="error" variant="text">
            {Errors[error]}
          </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            //   onClick={HandleChange}
            >
              Join Community
            </Button>
            
          </Box>
        </Box>
      </Container>
  );
}
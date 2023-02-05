import React,{useState,useEffect} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid} from '@mui/material/';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate,useSearchParams} from 'react-router-dom'

import Errors from '../Mzzzezs/hooks/Errors/Errors';

export default function CreateCommunity() {
    const navigate=useNavigate()
    const styles = theme => ({
      notchedOutline: {
        borderWidth: "1px",
        borderColor: "#1a237e"
      }
    })
    const [searchParams, setSearchParams] = useSearchParams();
    const [CommName,setPhone]=useState('')
    const [CommType,setPassword]=useState("Educational")
    const [error,setError]=useState(100)
    const style={"width":"29.9vw","height":"9.8vh",'color':'#1a237e','border-top':'none','outline':'none'}
    useEffect(()=>(
        sessionStorage.clear()
    ))
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data ={
        name:CommName,
        type:CommType,
        Admin:searchParams.get("name")
    }
     
    let result= await axios.post('https://backend-production-c9c7.up.railway.app/create',data)
    console.log(result.data)
    if(result.data.error===200){
      navigate('/?name='+searchParams.get("name")+'&comm='+searchParams.get("comm"))
    }
    else{
      setError(result.data.error)
      setTimeout(()=>{
        setError(100)
      },3000)
    }
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
          <Typography component="h1" style={{color:'#1a237e'}} variant="h5">
            Create Community
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              variant='filled'
              onChange={(e) => setPhone(e.target.value)}
              value={CommName}
              label="Community Name"
              autoFocus
            />
            <select value={CommType} onChange={(e)=>{setPassword(e.target.value)}} onSelect={(e)=>{setPassword(e.target.value)}} style={style}>
              <optgroup>
                <option style={{color:'#1a237e'}} value="Educational">Educational</option>
                <option style={{color:'#1a237e'}} value="Personal"  >Personal</option>
                <option style={{color:'#1a237e'}} value="Proffesional">Proffesional</option>
              </optgroup>
              </select>
            <Typography component="h5" color="error" variant="text">
            {Errors[error]}
          </Typography>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              style={{backgroundColor:'#1a237e'}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            //   onClick={HandleChange}
            >
              Create Community
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
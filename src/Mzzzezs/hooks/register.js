import React,{useState,useEffect} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid} from '@mui/material/';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom'
import Errors from './Errors/Errors';

export default function Register() {
    const navigate=useNavigate()
   
    const [Name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [Cpassword,setCpassword]=useState('')
    const [error,setError]=useState(100)
    

    useEffect(()=>(
        sessionStorage.clear()
    ))
    async function HandleChange(){
        const userData={
            Name:Name,
            RePassword:Cpassword,
            Password:password
        
        }
        console.log("see")
        let result= await axios.post('https://backend-production-c9c7.up.railway.app/reg',userData)
        if(result.data.error!==200){
            setTimeout(() => setError(100), 3000);
            setError(result.data.error)
        }
        else{
            sessionStorage.setItem("CurrentUser",Name)
            navigate(`/`)
        }
        setName("")
        setPassword("")
        setCpassword("")
    } 
  const handleSubmit = async (event) => {
    event.preventDefault();
    HandleChange()
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
          <Typography component="h1" variant="h5" style={{"color":"#0d47a1"}}>
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              label="Name"
              name=""
              autoComplete="email"
              helperText="Enter a unique UserName.The same will be used for future identification"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter Password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="text"
              id="password"
              helperText="Enter a 8 digit strong Password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Re-Enter Password"
              onChange={(e)=>setCpassword(e.target.value)}
              value={Cpassword}
              type="text"
              id="Cpassword"
              helperText="Enter the above Password again"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
          <Typography  color="error">
                  <b>{Errors[error]}</b>
              </Typography>
            <Button
            type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={HandleChange}
            >
              Sign In
            </Button>
            <Typography component="h1" variant="text">
            {/* {Error[error]} */}
          </Typography>
          </Box>
        </Box>
      </Container>
  );
}
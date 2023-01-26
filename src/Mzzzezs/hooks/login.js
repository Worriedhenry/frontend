import React,{useState,useEffect} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid} from '@mui/material/';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom'
import Errors from './Errors/Errors';

export default function Login() {
    const navigate=useNavigate()
   
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(100)
    const [remember,setRemember]=useState(false)
    useEffect(()=>(
      
        sessionStorage.clear()
    ))

    const Remember=(e)=>{
      if(remember===false){
        setRemember(true)
        return
      }
      setRemember(false)
      localStorage.clear()
    }
    // const userData={
    //     Phone:phone,
    //     Password:password,
    // }
    // const HandleChange=async ()=>{
    //     let result= await axios.post('http://localhost:3030/',userData)
    //     setError(result.data.err)

    //     if(result.data.error!==200){
    //         setTimeout(() => setError(100), 3000);
    //         setError(result.data.error)
    //     }
    //     else{
    //         sessionStorage.setItem("CurrentUser",phone)
    //         navigate(`/?Phone=${phone}&&Name=${result.data.Name}`)
    //     }
    //     setPhone("")
    //     setPassword("")
    // }
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data ={
        name:phone,
        password:password
    }
    let result= await axios.post("http://localhost:3001/login",data)
    console.log(result)
    if(result.data.error!==200){
      setTimeout(() => setError(100), 3000);
      setError(result.data.error)
  }
  else{
    if(remember===true){
      localStorage.setItem("user",phone)
    }
      sessionStorage.setItem("CurrentUser",phone)
      navigate("/chats?name="+phone+"&comm=null")
  }
  setPhone("")
  setPassword("")
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              label="Name"
              autoComplete="email"
              autoFocus
              helperText="Enter the unique Name registered during Sign Up"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Pass"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="text"
              id="password"
              autoComplete="current-password"
              helperText="Enter 8 digit Password"
            />
            <FormControlLabel
              control={<Checkbox onChange={(e)=>Remember(e.target.value)} value={remember} color="primary" />}
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
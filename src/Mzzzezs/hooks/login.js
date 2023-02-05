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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data ={
        name:phone,
        password:password
    }
    let result= await axios.post("https://backend-production-c9c7.up.railway.app/login",data)
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
        <div className='signIn'>
          <Box component="form" 
          sx={{border:"2px solid #0d47a1",padding:"10%",borderRadius:"5%" }}
          onSubmit={handleSubmit}>
          <Typography sx={{textAlign:'center',color:'#1a237e'}}component={"h1"} variant="h3">Sign In</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              variant='filled'
              sx={{input:{color:'#1a237e'}}}
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
              variant='filled'
              color='primary'
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              sx={{input:{color:'#1a237e'}}}
              autoComplete="current-password"
              helperText="Enter 8 digit Password"
            />
            <FormControlLabel
            sx={{color:'#1a237e'}}
              control={<Checkbox onChange={(e)=>Remember(e.target.value)} value={remember} style={{color:'#1a237e'}} />}
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
              style={{backgroundColor:'#1a237e'}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs sx={{color:'#0d47a1'}}>
                <Link  href="#" variant="body2">
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
          </div>
  );
}
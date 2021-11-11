import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/core/IconButton';
import {Grid} from '@material-ui/core';
import {react, useEffect, useState} from 'react';
import axios from 'axios';
 
export default function GetAirportNames(){    
     const [placeholder, setPlaceHolder] =useState([])

    const [airportnames, setAirportname] =useState([])
     useEffect(()=>{
       (async ()=> {
       try{
       const response = await axios.get('https://localhost:44304/api/CityWeatherLogs/GetAirportNames');
       const data = response.data
       setAirportname(data)
       console.log(airportnames)
       setPlaceHolder(data);
       return (airportnames);
       console.log(data.name)
       }
       catch(error){
           console.log(error)
       }
   })();
},[]);
}
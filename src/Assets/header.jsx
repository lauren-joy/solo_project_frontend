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
import {react, useEffect, useState} from 'react';
import axios from 'axios';
import useSWR, {SWRConfig} from 'swr';
import {  TextField, MenuItem, FormControl, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, } from '@material-ui/core';
import { GrSearch, GrClose } from "react-icons/gr";
// Third Party Libraries
import * as Yup from 'yup';
import { Paper } from '@material-ui/core';
import './SearchBar.css';
// Material UI
import { Grid, Container } from '@material-ui/core';
import { makeStyles  } from '@material-ui/core/styles';
import GetCityName from './GetCityName';
const fetcher = (...args)=> fetch(...args).then(res=>res.json());

const useStyles = makeStyles (theme=> ({
  root: {
      flexGrow: 1,
      float:'left',
      clear:'none',
    },
    messageBar:{
      paddingTop: "0px",
      paddingLeft: "1150px",
      width: 800,
      height: 50,
    },
  clientInfoContainers: {
    height: 17000,    width: 600,   
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "50px",
    marginLeft: "50px",
    float:'left',
clear:'none',
  },
  subClientInfoContainer: {
      height: 225,
      width: 1425 , align: 'center',
      paddingLeft: "450px",
      //sets the height of the paper
  },
  bySelect: {
      paddingTop: "1px",
      padding: "60px"
  },
  byReport: {
      paddingTop: "0.5px",
      padding: "60px"
  },alignItemsAndJustifyContent: {
      marginTop: theme.spacing(3),
      width: "100%",
      overflowX: "auto",
      marginBottom: theme.spacing(2),
      margin: "auto"
    },
  innerContent: {
    height: 850,    width: "100%", paddingBottom: "0px" , padding: "0px", align: 'center',
    paddingLeft: "300px", paddingRight: "300px",
    clear:'none',},
  innerContentDDL: {
      paddingLeft: "2px",
      padding: "20px"
  }
}))
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  paddingTop: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('m')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
export default function Creat(){
  return(
  <SWRConfig value = {{fetcher}}>
    <SearchAppBar/></SWRConfig>
  );
}




function SearchAppBar() {
    
   

    const classes = useStyles(); 
    useEffect(()=>{
       (async ()=> {
       
   })();
},[]);
const url ="https://localhost:44304/api/CityWeatherLogs/GetAirportNames";
const {data, error} = useSWR(url);
if(error){
  return <div> error</div>
}
if(!data){
  return <div> Loading.. </div>
}
console.log("data")

  
  return (
   <div>
      <Display airportnames ={data} 
      categories ={{... new Set(data.map(p=> p.id))}}/>
   </div>
  );
}
function Display({airportnames, data}){
  console.log(data)
  console.log(airportnames)
  const [criteria, setCriteria] = useState("1");
  const [searchItem, setSearchItem] = useState("");
  const classes = useStyles();
  const [value, setData] =useState([])
  const [item, selectedItem] = useState([])
  const [render, setRender]= useState(false)
  const [prop, setArticlesObject] = useState([])
  
const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");
const [latitude, setLatitude] = useState([]);
const [longitude, setLongitude] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = airportnames.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {      setRender(false)

      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");      setRender(false)

  };
  const SelectItem = (event)=> {
    console.log(event.target.value)
   console.log( filteredData)
   for (let i =0; i < filteredData.length; i++) {
    if (filteredData[i].id==event.target.value) {
      setLatitude(filteredData[i].latitude_deg)
      setLongitude(filteredData[i].longitude_deg)
      var latlong = filteredData[i].latitude_deg +","+ filteredData[i].longitude_deg;
      var nameOfAirport = filteredData[i].name;
      setRender(true)
      console.log(filteredData[i].latitude_deg +","+ filteredData[i].longitude_deg)
    }
    else{
      console.log("no")
      setRender(false)
    }
}   const stringid = (event.target.value);

   var articlesObj = 
    {
      id: stringid,  
     airportid: stringid.toString(),
      name: nameOfAirport,
    latlong: latlong,
    }
    console.log(articlesObj)
    setArticlesObject(articlesObj)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
     <Grid 
            justify="space-between"
            container
            spacing = {24}>
        <Grid item>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Weather Application
          </Typography>

          </Grid>
        <div className = "App">
            <div className="search">
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <div className="searchIcon">
                {filteredData.length === 0 ? (
                  <GrSearch />
                ) : (
                  <GrClose id="clearBtn" onClick={clearInput} />
                )}
              <StyledInputBase
                      value={wordEntered}
                      onChange={handleFilter}
              placeholder="Search Airport List"
              inputProps={{ 'aria-label': 'search' }}
            /> 
            </div>
            </Search>
          
          </div> 
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
   
      <div  className = {classes.messageBar}>
              {   filteredData.map((item)=>(       
        <MenuItem onClick = {SelectItem} key = {item.id} value = {item.id}> 
        {item.name}
        </MenuItem>
         ))}
            </div>
            {render===true?<GetCityName props = {prop}/>:<div className ={classes.subClientInfoContainer}><h1>Welcome to air traffic forecast</h1> <h2> type any air port to continue!</h2></div>}  

    </Box>
  );
}

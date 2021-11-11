import react, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import WeatherIcon from 'react-icons-weather';
import {TiWeatherSunny,TiWeatherWindy, TiWeatherStormy, TiWeatherCloudy, TiWeatherNight, TiWeatherSnow} from "react-icons/ti"
import {GiAirplaneArrival, GiCalendar} from "react-icons/gi"
import GetCityName from './GetCityName'
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { date } from 'yup';
const useStyles = makeStyles (theme=> ({
    root: {
        flexGrow: 1,
        float:'left',
        clear:'none',
      },
      messageBar:{
        paddingTop: "0px",
        paddingLeft: "700px",
        width: 900,
        height: 300,
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
        height: 300,
        width: 1600 , align: 'center',
        paddingTop: 0, 
        paddingLeft: "150px",
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
      height: 400,    width: "100%", paddingBottom: "0px" , paddingLeft: "700px", align: 'center',
      paddingLeft: "300px", paddingRight: "300px",
      clear:'none',},
    innerContentDDL: {
        paddingLeft: "2px",
        padding: "20px"
    }
  }))

export default function GetTraffic({props}){
    const classes = useStyles(); 
    const [cities, setCities] = useState([]);
   
    const [temperature, setTemperature] = useState([]);
    
    const [getresponse, setGetResponse] =useState([])
    const [getresponseTrafficPrediction, setGetResponseTrafficPrediction] =useState({})

    const [data, setData] = useState([]);
    const [playcity, setplayCity] = useState(false);
    const [playweather, setplayWeather] = useState(false);
    const [playtraffic, setplayTraffic] = useState(false);
    const[objectw, setObject] = useState([]);

    useEffect(()=>{
      (async ()=> {

                        try{
                          const response =  await axios.post('https://localhost:44304/api/CityWeatherLogs/CalculateWeatherPredictions', props);
                          const responsedata = response.data
                          console.log('traffic')
                          console.log(responsedata)

                          setGetResponseTrafficPrediction(responsedata.list)
                          setGetResponse(responsedata.goodDayForPicnic)
                          if(responsedata.list.length>1)
                          setplayTraffic(true)
                     }
                     catch(e ){
                         console.log('error oh traffic')
                     }
                    })();
                   },[]);

                  
   


         const expression = (
                <div className ={classes.subClientInfoContainer}> 
                <Grid container xs= {12}>

                    {playtraffic==true?
                      getresponseTrafficPrediction.map((item)=>(
                        <div>
                          <Grid item xs={12}>
                        <Paper elevation ={3}>
                        <Grid   item xs ={6} key ={item.id}> 
                        
                       {item.temp*(1.8)-459> 70 ? <TiWeatherSunny/> : <TiWeatherCloudy/>} <h3> Temperature {Math.round((item.temp*(1.8)-459)*100)/100} f </h3>
                                </Grid>
                          <Grid item xs ={8}><GiAirplaneArrival/> <h3>Flight Capacity  {item.weatherstatus} </h3></Grid>
                          <Grid item xs ={8}> <GiCalendar/> <h3> Date <Grid item xs={4}></Grid> {item.dt_txt} </h3></Grid>
                          </Paper>                    
                          {playtraffic==true&item.weatherstatus.length>1?<div></div>:<h4>No city name for this airport </h4>}

                             </Grid>

                       </div>
                      )):null
                    }
                      
                </Grid>
                <h1>  {playtraffic==true?getresponse: <h3>  </h3>} </h1>
                </div>
                )    
               
                
                return expression;
                
                
           
            }
      

import react, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import WeatherIcon from 'react-icons-weather';
import {TiWeatherSunny,TiWeatherWindy, TiWeatherStormy, TiWeatherCloudy, TiWeatherNight, TiWeatherSnow} from "react-icons/ti"
import {GiAirplaneArrival} from "react-icons/gi"
import GetCityName from './GetCityName'
import GetTraffic from './GetTraffic';
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
        height: 225,
        width: 1425 , align: 'center',
        paddingLeft: "700px",
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

export default function GetFromSearch({props}){
    const classes = useStyles(); 
   
    const [getresponse, setGetResponse] =useState([])
    const [getresponseTraffic, setGetResponseTraffic] =useState({})

    const [data, setData] = useState([]);
    const [render, setRender] = useState(false);

    const [playtraffic, setplayTraffic] = useState(false);

    useEffect(()=>{
      console.log('Testing GetFromSearch')

      console.log(props);
        
          (async ()=> {

                          try{
                            console.log(props)
                            const response =  await axios.post('https://localhost:44304/api/CityWeatherLogs/PassFromDropDownList', props);
                            const responsedata = response.data
                            setGetResponseTraffic(responsedata)
                            if(responsedata.name.length>1){
                              setRender(true)
                            }
                            console.log(responsedata)

                            
                                 
                                }
                                catch(e ){
                                    console.log('error oh well')
                                }                  
                                           })();
                                           
                                            
                            },[]);
                            const re =(
                                <div> {render===true?<GetTraffic props={getresponseTraffic}/>:null}</div>
                            )
                            return re
                             
      }
                                    

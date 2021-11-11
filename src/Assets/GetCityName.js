import react, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import WeatherIcon from 'react-icons-weather';
import {TiWeatherSunny,TiWeatherWindy, TiWeatherStormy, TiWeatherCloudy, TiWeatherNight, TiWeatherSnow} from "react-icons/ti"
import {GiAirplaneArrival} from "react-icons/gi"
import  GetFromSearch from './GetFromSearch'
import GetTraffic from './GetTraffic'
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
        height: 125,
        width: 1425 , align: 'center',
        paddingLeft: "150 px",
        paddingBottom: "1px"
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

export default function GetCityNames({props}){
    console.log(props)
    
    const classes = useStyles(); 
    const [articles, setArticles] = useState({})
    const [ articlesObj, setArticlesObj] = useState({})

    const [render, setRender] = useState(false);
    const [cityname, setData] = useState([]);
    
    useEffect(()=>{
    
        if(props.id ) { (async ()=> {

                try{
                   console.log('Testing GetCityName')
                   
                   const response =  await axios.post('https://localhost:44304/api/CityWeatherLogs/GetCityName',props);
                   const datalol = response.data
                     setData(datalol)
                     var articlesObj = 
                     {
                       airportid: props.id.toString(),
                       city: datalol.toString()
                     };     
                    setArticlesObj(articlesObj)

                    if(articlesObj.city.length>1){
                    setRender(true)
                    }
                     console.log(articlesObj)
              
                   }
                   catch(e ){
                           console.log("error first end point ")
                       }
                      })();
                 
                    
                    }},[]);    
                    
                
                const expression = (
                  <div >            
                    <div className={classes.subClientInfoContainer}> <h1 >  Airport Name: {props.name} </h1>
                      <h2> City Name: {cityname}</h2></div> 
                     
                    {render===true?<GetFromSearch props={articlesObj}/>:null}  
                  </div>              
                       )
                 return expression;
           
            }
      

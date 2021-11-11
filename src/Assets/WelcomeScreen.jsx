import {Formik, Field} from 'formik';
import {react, useEffect, useState} from 'react';
import Select from "@material-ui/core/Select";
import { Box } from '@material-ui/core';
// Third Party Libraries
import * as Yup from 'yup';

// Material UI
import { Grid, Container } from '@material-ui/core';
import { Typography, TextField, MenuItem, FormControl, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, } from '@material-ui/core';
import { makeStyles  } from '@material-ui/core/styles';
import axios from 'axios';
import MaterialTable from 'material-table';
import { mergeClasses } from '@material-ui/styles';
import GetAirportNames from './GetAirportnames';
const useStyles = makeStyles (theme=> ({
    root: {
        flexGrow: 1,
        float:'left',
        clear:'none',
      },
      messageBar:{
        paddingTop: "0px",
        width: 2133,
        background: "#FF4500",
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
        height: 1425,
        width: 1425 //sets the height of the paper
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
      height: 200,    width: "100%", paddingBottom: "15px" , padding: "2px", align: 'center',
      paddingLeft: "1100px", paddingRight: "300px",
      clear:'none',},
    innerContentDDL: {
        paddingLeft: "2px",
        padding: "20px"
    }
  }))
const ButtonClick =(values)=>{
   
    // response 
}
export default function WelcomeScreen() {
    const classes = useStyles(); 
    const [data, setData] = useState([]);
    const [render, setRender] = useState(true);


   const initialFields = {
       'weatherCityId': '',
        'FromDate': '',
        'ToDate': '',
        'name': ''
   }
   const columns =[
       {title: 'Weather Id', field: 'id', type: 'numeric', align: 'center'},
       {title: 'City', field: 'name', align: 'center'},
       {title: 'Plane Frequency', field: 'planeFrequency', align: 'center',},
       {title: 'Wind Speed', field: 'windSpeed', align: 'center'},
       {title: 'Status', field: 'status', align: 'center' }
   ]
   
   const [airportnames, setAirportname] =useState([])
     const [placeholder, setPlaceHolder] =useState([])
   useEffect(()=>{
       (async ()=> {
       try{
       const response = await axios.get('https://localhost:44304/api/CityWeatherLogs/GetAirportNames');
       const data = response.data
       setAirportname(data)
       setPlaceHolder(data);
       console.log(airportnames)
       console.log(data)
    
    }
       catch(error){
           console.log(error)
       }
   })();
},[]);



const expression = (
    <div>         
        <br/><br/>

          <Formik
                                    initialValues={ initialFields} 
                                    // initialValues={{...initialFieldValuesFromLocalForage}}
                                    onSubmit={ButtonClick}
                                    // validator={() => ({})} 
                                >
                                    {
                                        (props) => {
                                            return (
                                                
                                                // Have to add this noValidate so the standard html "ugly" required input doesn't show
                                                <FormControl noValidate>   <div className = {classes.innerContent}>
                                                  </div>
                                                        
                                                    
                                                </FormControl>
                                            )
                                        }
                                    }
                                </Formik>
                             
    </div>
)
    
    return ( 
        expression
    );
}
import React, { useState } from "react";
import { GrSearch, GrClose } from "react-icons/gr";
import { useEffect} from 'react';
import axios from 'axios';
import "./SearchBar.css";
import { Typography, TextField, MenuItem, FormControl, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, } from '@material-ui/core';

function SearchBar({ placeholder }) {
    const [airportnames, setAirportname] =useState([])
    const [data, setData] =useState([])
   
    useEffect(()=>{
       (async ()=> {
       try{
       const response = await axios.get('https://projectairport.azurewebsites.net/api/CityWeatherLogs/GetAirportNames');
       setData(response.data)
       setAirportname(data)
       console.log(airportnames)
       console.log(data)
       
       }
       catch(error){
           console.log(error)
       }
   })();
},[]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    

        <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <GrSearch />
            ) : (
              <GrClose id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        <div >
         <a> {   filteredData.map((item)=>(
    <MenuItem key = {item.id} value = {item.id}> {item.name}</MenuItem>
             ))}</a>
        </div>
      </div>
  );
}

export default SearchBar;
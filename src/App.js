import React, { useEffect, useState } from 'react';
import Main from './main.js';
import Header from './header.js';
import spaceImage from '../src/assets/spaceimage.png';
import './App.css';

const App = () => {
  const [ launchData, setLaunchData ] = useState( [] );
  const [ launchYearsToDisplay, setLaunchYearsToDisplay ] = useState( [] )

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
    .then(( res ) => res.json())
    .then(( results ) => {
        const sortLaunches = results.sort(( a, b ) => a.flight_number - b.flight_number)
        // const sortLaunches = results.sort(( a, b ) => a.date_unix - b.date_unix)
        setLaunchData( sortLaunches );
        setLaunchYearsToDisplay( sortLaunches );
        return results;
    })
    .catch((error) => console.error( error ))

  }, []);


  return (
    <div className="app">
      <Header />
      <div className="app-container">
      <img className="app-image" src={ spaceImage } alt="space rocket"/>
      { launchData.length !== 0 && 
      <Main 
        launchData={launchData} 
        setLaunchData={setLaunchData} 
        launchYearsToDisplay={launchYearsToDisplay} 
        setLaunchYearsToDisplay={setLaunchYearsToDisplay}
      />}
      </div>
    </div>
  );
}

export default App;

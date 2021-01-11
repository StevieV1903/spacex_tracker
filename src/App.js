import React, { useEffect, useState } from 'react';
import Main from './main.js';
import './App.css';

const App = () => {
  const [ launchData, setLaunchData ] = useState( [] );
  const [ launchYearsToDisplay, setLaunchYearsToDisplay ] = useState( [] )

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
    .then(( res ) => res.json())
    .then(( results ) => {
        const sortLaunches = results.sort(( a, b ) => a.flight_number - b.flight_number)
        setLaunchData( sortLaunches );
        setLaunchYearsToDisplay( sortLaunches );
        return results;
    })
    .catch((error) => console.error( error ))

  }, []);


  return (
    <div className="App">
      <h1>Space X Tracker</h1>
      <Main />
    </div>
  );
}

export default App;

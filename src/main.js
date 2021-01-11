import React from 'react';
import './main.css';

const Main = ({ launchData, setLaunchData, launchYearsToDisplay, setLaunchYearsToDisplay }) => {

    const getDataForEachLaunch = () => {
        const requiredLaunchDetails = launchYearsToDisplay.map( (launch, index) => {
            return( 
                <div key={index} className="launch-list-container">
                    <ul className="launch-list">
                        <li className="launch-list-flight-number">#{launch.flight_number}</li>
                        <li className="launch-list-name">{launch.name}</li>
                        {/* <li className="launch-list-date">{convertDateFromUnixTimeStamp(launch.date_unix)}</li> */}
                        {/* <li className="launch-list-rocketID">{displayRocketName(launch.rocket)}</li> */}
                    </ul>
                </div> 
            )
        })
        return requiredLaunchDetails   
    };

    return(
    <div>
        <h1>Main</h1>
        <p>{getDataForEachLaunch()}</p>
    </div>
    )


};

export default Main;
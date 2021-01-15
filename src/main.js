import React from 'react';
import './main.css';

const Main = ({ 
    // launchData, 
    // setLaunchData, 
    launchYearsToDisplay, 
    setLaunchYearsToDisplay }) => {

    const getDataForEachLaunch = () => {
        const requiredLaunchDetails = launchYearsToDisplay.map( (launch, index) => {
            return( 
                <div key={index} className="launch-list-container">
                        <div className="launch-list-flight-number">
                            <p>#{launch.flight_number}</p>
                        </div>
                        <div className="launch-list-name">
                            <p>{launch.name}</p>
                        </div>
                        <div className="launch-list-date">
                            <p>{convertDateFromUnixTimeStamp(launch.date_unix)}</p>
                        </div>
                        {/* <li className="launch-list-rocketID">{displayRocketName(launch.rocket)}</li> */}
                </div>
            )
        })
        return requiredLaunchDetails   
    };

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const convertDateFromUnixTimeStamp = (timestamp) => {
        let date = new Date(timestamp * 1000)
        let formattedDate = date.toLocaleDateString("en-GB", options)
        return formattedDate
    };

    return(
    <>
        <div className="launch-data-container">
            <p>{getDataForEachLaunch()}</p>
        </div>
    </>
    )


};

export default Main;
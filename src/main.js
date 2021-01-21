import React, { useEffect, useState } from 'react';
import './main.css';

const Main = ({ 
    launchData, 
    setLaunchData, 
    launchYearsToDisplay, 
    setLaunchYearsToDisplay }) => {

    const [ rocketIdData, setRocketIdData ] = useState( [] )
    const [ rocketLaunchDates, setRocketLaunchDates ] = useState( [] )

    useEffect(() => {
        // getUniqueDatesForFilter()
        getRocketName()
        
    }, [] )

    const getRocketName = () => {
        const rocketIds = []
        launchData.forEach( launch => {
            if( rocketIds.includes( launch.rocket ) === false ) {
                rocketIds.push( launch.rocket )
            }
        })
        const requests = rocketIds.map( rocketId => {
            return fetch( 'https://api.spacexdata.com/v4/rockets/' + rocketId )
                    .then(( res ) => res.json())
                    .catch((error) => console.error( error ))

        })
        Promise.all( requests )
            .then(( result )  => {
            setRocketIdData( result )  
        })      
}

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
                            <div className="rocket-date-name">
                                <div className="launch-list-date">
                                    <p>{convertDateFromUnixTimeStamp(launch.date_unix)}</p>
                                </div>
                                <div>
                                    <p className="launch-list-rocketID">{displayRocketName(launch.rocket)}</p>
                                </div>
                            </div>
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

    //rocketId is passed in and checked against the rocket.id and where strictly equal returns the rocket Name
    const displayRocketName = ( rocketId ) => {
        const rocketName = rocketIdData.filter( rocket => rocket.id === rocketId)
        return rocketName[0].name
    }

    return(
    <>
        <div className="launch-data-container">
            {rocketIdData.length !== 0 &&
            <p>{getDataForEachLaunch()}</p>
            }
        </div>
    </>
    )


};

export default Main;
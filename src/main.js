import React, { useEffect, useState } from 'react';
import './main.css';
import sort from '../src/assets/sort.png';


const Main = ({ 
    launchData, 
    setLaunchData, 
    launchYearsToDisplay, 
    setLaunchYearsToDisplay }) => {

    const [ rocketIdData, setRocketIdData ] = useState( [] );
    const [ rocketLaunchDates, setRocketLaunchDates ] = useState( [] );
    const [ isSortedDescending, setIsSortedDescending ] = useState( false );
    

    useEffect(() => {
        getUniqueDatesForFilter()
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
    };

    const getUniqueDatesForFilter = () => {
        const retrievedYearsForFilter = [];
        const dateUtcFromLaunches = launchData.map( (launch) => launch.date_utc)
        const launchYearFromDates = dateUtcFromLaunches.map((launchDate) => {
        const launchYear = launchDate.slice(0, 4)
        if( retrievedYearsForFilter.includes( launchYear ) === false){
            retrievedYearsForFilter.push( launchYear )
        }})
            setRocketLaunchDates( retrievedYearsForFilter );  
            // console.log("Unique Years State", rocketLaunchDates) 
    };

    const displayUniqueDatesinSelectMenu = () => {
        const selectMenuOptions = rocketLaunchDates.map(( rocketLaunchDate, index ) => (
            <option key={ index } value={ rocketLaunchDate }>
                Launches in { rocketLaunchDate }
            </option>
        ));
        return(
            <div className="filter-container">
                <select onChange={(event) => filterLaunchesByUniqueYear(event.target.value)}>
                    { selectMenuOptions }
                    <option value="All Dates">All Launches</option>
                    <option selected disabled>Filter Launches by Year</option>
                </select>
            </div>
        );
    };

    const filterLaunchesByUniqueYear = (uniqueYear) => {
        if (uniqueYear === 'All Dates') {
            setLaunchYearsToDisplay( launchData )

        } else {
            setIsSortedDescending(false)
            const filteredDates = launchData.filter(( launch ) => launch.date_utc.slice(0,4) === uniqueYear);
            const sortedFilteredDates = filteredDates.sort(( a, b ) => a.flight_number - b.flight_number)
            const filteredSort = [ ...sortedFilteredDates]
            setLaunchYearsToDisplay( filteredSort )
            
            
        }
    };

    // const handleAscending = () => {
    //     const sortLaunchesAscending = launchYearsToDisplay.sort(( a, b ) => a.flight_number - b.flight_number)
    //     //creates new Array to refresh page
    //     const sortedAscending = [ ...sortLaunchesAscending]
    //     setLaunchYearsToDisplay( sortedAscending );
        
    // };

    // const handleDescending = () => {
    //     const sortLaunchesDescending = launchYearsToDisplay.sort(( a, b ) => b.flight_number - a.flight_number)
    //     //creates new Array to refresh page
    //     const sortedDescending = [ ...sortLaunchesDescending ]
    //     setLaunchYearsToDisplay( sortedDescending );
    // };

    // const handleSortToggle = () => {
    //     setIsSortedDescending(!isSortedDescending)
    //     console.log(isSortedDescending)
    //     if( isSortedDescending === true){
    //         const sortLaunchesDescending = launchYearsToDisplay.sort(( a, b ) => b.flight_number - a.flight_number)
    //     //creates new Array to refresh page
    //     const sortedDescending = [ ...sortLaunchesDescending ]
    //     setLaunchYearsToDisplay( sortedDescending );
            
    //     }else if( isSortedDescending === false){
    //         const sortLaunchesAscending = launchYearsToDisplay.sort(( a, b ) => a.flight_number - b.flight_number)
    //     //creates new Array to refresh page
    //     const sortedAscending = [ ...sortLaunchesAscending]
    //     setLaunchYearsToDisplay( sortedAscending );
    //     }
    // }

    const handleSortToggle = () => {
        setIsSortedDescending(!isSortedDescending)
        // console.log(isSortedDescending)
            const sortingLaunches = 
            launchYearsToDisplay.sort(function (a, b) {
                const x = a.flight_number;
                const y = b.flight_number;
              return(isSortedDescending ? x - y : y - x);
            });
            const sorted = [ ...sortingLaunches]
            setLaunchYearsToDisplay( sorted );
            // console.log(launchYearsToDisplay)
            };


    return(
    <>

    <div>
        <div className="button-container">
            <button className="ascending" onClick={ handleSortToggle }>
                Sort <img className="sort" src={ sort } alt="sort"/>  
            </button>
        {displayUniqueDatesinSelectMenu()}
        </div>
            <div className="launch-data-container">
            {rocketIdData.length !== 0 &&
            getDataForEachLaunch()}
        </div>
    </div>

    </>
    )
};

export default Main;
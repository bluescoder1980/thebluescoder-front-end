
/*
AM2020.10.23 : This is the Java Script that will do the heavy lifting for integration with the Strava API. 
*/

/**
 * This function is the critical function that will take the JSON from the reAuth function to get the latest valid 
 * access token to get the list of Activities from Strava 
 */
function getActivities(res)
{
    //console.log(res.access_token)
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`

    fetch(activities_link)
        //.then((res) => console.log(res.json()))
        .then(response => response.json())
        //.then(data => console.log(data));
        .then(function(data) {
            console.log(data)
            // create my text
            document.getElementById('js-strava-content').innerHTML = "<p>Strava Data Loaded : Last 10 Activities</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>Type | Name of Activity | Distance (Miles)</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[0].type +" | " + data[0].name +" | " + convertToMiles(data[0].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[1].type +" | " + data[1].name +" | " + convertToMiles(data[1].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[2].type +" | " + data[2].name +" | " + convertToMiles(data[2].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[3].type +" | " + data[3].name +" | " + convertToMiles(data[3].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[4].type +" | " + data[4].name +" | " + convertToMiles(data[4].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[5].type +" | " + data[5].name +" | " + convertToMiles(data[5].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[6].type +" | " + data[6].name +" | " + convertToMiles(data[6].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[7].type +" | " + data[7].name +" | " + convertToMiles(data[7].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[8].type +" | " + data[8].name +" | " + convertToMiles(data[8].distance) + "</p>";
            document.getElementById('js-strava-content').innerHTML += "<p>" + data[9].type +" | " + data[9].name +" | " + convertToMiles(data[9].distance) + "</p>";
                 
               

         })
        //Need to dump the JSON into HTML
        //1) Read JSON Object from the Response
        //2) Access JSON Object and create a dynamic array 
        //3) Return array to HTML caller
        
        
}
/**
 * Quick function to convert strava meters to miles.
 *  
 */
function convertToMiles(i) {   
    return i*0.000621371192;
}
/**
 * This function is important because it using the Strava Client info and static refresh token to get a new 
 * access to make calls to strava to retrieve information from the API
 */
function reAuthorize(){

    const auth_link = "https://www.strava.com/oauth/token"

    fetch(auth_link, {
        method: 'post', 
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Content-Type' : 'application/json'
        }, 

        body: JSON.stringify({

            //Need to change this to dynamically read from a database
            client_id: '52385',
            client_secret: '34be8dc0e3e70230a2d0a2cfd0a72d130216121e',
            refresh_token: '648de3b5322c17e58a27eaa4a4b1cf3a82e25279',
            grant_type: 'refresh_token'

        })
    }).then(res => res.json())
        .then(res => getActivities(res))

}

reAuthorize()

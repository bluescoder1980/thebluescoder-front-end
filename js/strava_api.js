
/*
AM2020.10.23 : This is the Java Script that will do the heavy lifting for integration with the Strava API. 
*/


const auth_link = "https://www.strava.com/oauth/token"

/**
 * This function is the critical function that will take the JSON from the reAuth function to get the latest valid 
 * access token to get the list of Activities from Strava 
 */
function getActivities(res)
{
    console.log(res.access_token)
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`

    fetch(activities_link)
        .then((res) => console.log(res.json()))
        //Need to dump the JSON into HTML
        
}

/**
 * This function is important because it using the Strava Client info and static refresh token to get a new 
 * access to make calls to strava to retrieve information from the API
 */
function reAuthorize(){
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

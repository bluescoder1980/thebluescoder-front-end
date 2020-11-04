
/*
AM2020.10.23 : This is the Java Script that will do the heavy lifting for 
integration with the Spotify API. 
*/

/**
 * This function is the critical function that will take the JSON from the reAuth function to get the latest valid 
 * access token to get the list of Activities from Strava 
 */
function getTopArtists(res)
{
    //Need to dump the JSON into HTML
    //1) Read JSON Object from the Response
    //2) Access JSON Object and create a dynamic array 
    //3) Return array to HTML caller    
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + res.access_token); //BQC15jbXtt03wLRs6TpF3v8oJZFcB0mouudh9tVPEwh-33E0BKhgpAunBvZXbkK_K_jhqdRbUQ6aXDihm6adWOAmpi0a89c9Saf17xNleqL8nJd0YEGNg5AuZJgGlJUBoO3GWdC4t-iQkFgv7qqPhVvTCHL8gw-DPJTQ4oUtOJsZNBMRwEAPfNvczjz6PLiXzw");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=5", requestOptions)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(function(data) {
            //This is where we do something with the data.
            document.getElementById('js-spotify-content').innerHTML = "<p>Top 10 Favorite Artists : Rolling 4-Weeks</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>Name | # of Followers | Image </p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[0].name +" | " + data.items[0].followers.total +" | " + data.items[0].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[1].name +" | " + data.items[1].followers.total +" | " + data.items[1].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[2].name +" | " + data.items[2].followers.total +" | " + data.items[2].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[3].name +" | " + data.items[3].followers.total +" | " + data.items[3].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[4].name +" | " + data.items[4].followers.total +" | " + data.items[4].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[5].name +" | " + data.items[5].followers.total +" | " + data.items[5].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[6].name +" | " + data.items[6].followers.total +" | " + data.items[6].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[7].name +" | " + data.items[7].followers.total +" | " + data.items[7].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[8].name +" | " + data.items[8].followers.total +" | " + data.items[8].images[0].url + "</p>";
            document.getElementById('js-spotify-content').innerHTML += "<p>" + data.items[9].name +" | " + data.items[9].followers.total +" | " + data.items[9].images[0].url + "</p>";
        })
        //If something goes wrong catch it.
        .catch(error => console.log('error', error));
                   
}

/**
 * This function is important because it using the Strava Client info and static refresh token to get a new 
 * access to make calls to strava to retrieve information from the API
 */
function reAuthorize(){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic ZjU1N2RiY2QwYTVlNGY3YmFjN2M3NzFmODRkZTFiOTk6YjE4ZWRkMzFhOWQ3NDM2Zjk3ZTg0MDk0ZjVlNzM0NjE=");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "__Host-device_id=AQAsx0SjHxdEBzcodZN9Qv1oM9SVJUSM460EELVSuKBu5ZBuy_Npq6SY8bu01DqF3EBpQLYFHOWqI7bOVJ5ufG4575eXiD18nnE");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", "AQCo_qzBzze0NGV7y5qtFN5kbmHpuB5Xtcf_qZeDXOf1deUA87mYMx6BfVxe44l4tQUincHSoKATcyaPWDCK-wR6nodsIscS3Z3wDJRXdx3j8Un_jcoDY8IObhALfrxHBBM");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("https://accounts.spotify.com/api/token", requestOptions)
    //.then(response => response.text())
    //.then(result => console.log(result))
    //.catch(error => console.log('error', error));
      .then(response => response.json())
      .then(response => getTopArtists(response))
      .catch(error => console.log('error', error));
    //.then(res => res.json())
    //.then(res => getActivities(res))

}

reAuthorize()

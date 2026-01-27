// const { google } = require('googleapis');

// // Replace 'YOUR_API_KEY' with your actual API key
// const apiKey = 'AIzaSyBQjKp7Xt5hFJHYwPCjM1wBXg6KBBZrayo';
// // Replace 'YOUR_CHANNEL_ID' with your actual channel ID
// const channelId = 'UCyyEJA1Q2c_xpSiUykXunNQ';

// const youtube = google.youtube({
//     version: 'v3',
//     auth: apiKey
// });

// async function getVideoIds() {
//     let videoIds = [];
//     try {
//         // Get the uploads playlist ID
//         let response = await youtube.channels.list({
//             part: 'contentDetails',
//             id: channelId
//         });
//         const uploadsPlaylistId = response.data.items[0].contentDetails.relatedPlaylists.uploads;

//         // Get video IDs from the uploads playlist
//         let nextPageToken = '';
//         do {
//             response = await youtube.playlistItems.list({
//                 part: 'contentDetails',
//                 playlistId: uploadsPlaylistId,
//                 maxResults: 50,
//                 pageToken: nextPageToken
//             });

//             response.data.items.forEach(item => {
//                 videoIds.push(item.contentDetails.videoId);
//             });

//             nextPageToken = response.data.nextPageToken;
//         } while (nextPageToken);

//         console.log(videoIds);
//     } catch (error) {
//         console.error('Error fetching video IDs:', error);
//     }
// }

// getVideoIds();


// function fetchVideoIds() {
//     gapi.client.init({
//         'apiKey': 'AIzaSyBQjKp7Xt5hFJHYwPCjM1wBXg6KBBZrayo'
//     }).then(function() {
//         return gapi.client.request({
//             'path': '/youtube/v3/channels',
//             'params': {
//                 'part': 'contentDetails',
//                 'id': 'UCyyEJA1Q2c_xpSiUykXunNQ'
//             }
//         });
//     }).then(function(response) {
//         const uploadsPlaylistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
//         return gapi.client.request({
//             'path': '/youtube/v3/playlistItems',
//             'params': {
//                 'part': 'contentDetails',
//                 'playlistId': uploadsPlaylistId,
//                 'maxResults': 50
//             }
//         });
//     }).then(function(response) {
//         const videoIds = response.result.items.map(item => item.contentDetails.videoId);
//         displayVideoIds(videoIds);
//     }, function(reason) {
//         console.error('Error fetching video IDs:', reason.result.error.message);
//     });
// }

// function displayVideoIds(videoIds) {
//     const videoIdsList = document.getElementById('videoIdsList');
//     videoIds.forEach(videoId => {
//         const listItem = document.createElement('li');
//         listItem.textContent = videoId;
//         videoIdsList.appendChild(listItem);
//     });
// }

// // Load the YouTube Data API client library
// gapi.load('client', fetchVideoIds);

// const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path'); // Import the path module

// // Path to the service account key file
// const keyFile = path.join(__dirname, 'service-account-key.json'); // Replace with the path to your service account key file
// const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

// async function fetchVideoIds() {
//     const auth = new google.auth.GoogleAuth({
//         keyFile,
//         scopes
//     });

//     const youtube = google.youtube({
//         version: 'v3',
//         auth
//     });

//     try {
//         // Fetch all videos from the channel
//         const response = await youtube.videos.list({
//             part: 'id',
//             channelId: 'UCyyEJA1Q2c_xpSiUykXunNQ', // Replace with your YouTube channel ID
//             maxResults: 50 // Adjust as needed
//         });

//         const videoIds = response.data.items.map(item => item.id);
//         console.log('Video IDs:', videoIds);
//     } catch (error) {
//         console.error('Error fetching video IDs:', error);
//     }
// }

// fetchVideoIds();

// function loadClient() {
//     gapi.client.setApiKey('YOUR_API_KEY'); // Replace with your actual API key
//     return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
//         .then(function() { 
//             console.log('GAPI client loaded for API');
//         }, function(error) {
//             console.error('Error loading GAPI client for API', error);
//         });
// }

// function execute() {
//     return gapi.client.youtube.channels.list({
//         'part': 'contentDetails',
//         'id': 'UCyyEJA1Q2c_xpSiUykXunNQ' // Replace with your YouTube channel ID
//     }).then(function(response) {
//         const uploadsPlaylistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
//         return gapi.client.youtube.playlistItems.list({
//             'part': 'contentDetails',
//             'playlistId': uploadsPlaylistId,
//             'maxResults': 50
//         });
//     }).then(function(response) {
//         const videoIds = response.result.items.map(item => item.contentDetails.videoId);
//         displayVideoIds(videoIds);
//     }, function(reason) {
//         console.error('Error fetching video IDs:', reason.result.error.message);
//     });
// }

// function displayVideoIds(videoIds) {
//     const videoIdsList = document.getElementById('videoIdsList');
//     videoIds.forEach(videoId => {
//         const listItem = document.createElement('li');
//         listItem.textContent = videoId;
//         videoIdsList.appendChild(listItem);
//     });
// }

// gapi.load('client', loadClient);
// gapi.load('client:auth2', function() {
//     gapi.auth2.init({client_id: 'YOUR_CLIENT_ID'}); // Replace with your OAuth 2.0 client ID
// });


// Client ID and API key from the Developer Console
const CLIENT_ID = '792419084813-hbo9mpift6eof75mqba9ddhfp1hkcefl.apps.googleusercontent.com'; // Replace with your OAuth 2.0 client ID
const API_KEY = 'AIzaSyBQjKp7Xt5hFJHYwPCjM1wBXg6KBBZrayo'; // Replace with your API key

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

let authorizeButton = document.getElementById('authorize-button');
let signoutButton = document.getElementById('signout-button');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(authInstance.isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, (error) => {
        console.error('Error initializing GAPI client', error);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        execute();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

function execute() {
    return gapi.client.youtube.channels.list({
        'part': 'contentDetails',
        'id': 'UCyyEJA1Q2c_xpSiUykXunNQ' // Replace with your YouTube channel ID
    }).then((response) => {
        const uploadsPlaylistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
        return fetchVideoIds(uploadsPlaylistId);
    }).catch((error) => {
        console.error('Error fetching channel details', error);
    });
}

function fetchVideoIds(playlistId) {
    let videoIds = [];
    let nextPageToken = '';

    function fetchPage() {
        return gapi.client.youtube.playlistItems.list({
            'part': 'contentDetails',
            'playlistId': playlistId,
            'maxResults': 50,
            'pageToken': nextPageToken
        }).then((response) => {
            videoIds = videoIds.concat(response.result.items.map(item => item.contentDetails.videoId));
            nextPageToken = response.result.nextPageToken;
            if (nextPageToken) {
                return fetchPage();
            } else {
                displayVideoIds(videoIds);
            }
        }).catch((error) => {
            console.error('Error fetching video IDs', error);
        });
    }

    return fetchPage();
}

function displayVideoIds(videoIds) {
    const videoIdsList = document.getElementById('videoIdsList');
    videoIdsList.innerHTML = ''; // Clear the list first
    videoIds.forEach(videoId => {
        const listItem = document.createElement('li');
        listItem.textContent = videoId;
        videoIdsList.appendChild(listItem);
    });
}

// Load the API client and auth2 library
gapi.load('client:auth2', handleClientLoad);

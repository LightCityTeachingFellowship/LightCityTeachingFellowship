const { google } = require('googleapis');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

// Path to the service account key file
const keyFile = path.join(__dirname, 'service-account-key.json'); // Replace with the path to your service account key file
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

async function fetchVideoIds() {
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes
    });

    const youtube = google.youtube({
        version: 'v3',
        auth
    });

    try {
        // Fetch the uploads playlist ID
        const channelResponse = await youtube.channels.list({
            part: 'contentDetails',
            mine: true
        });
        const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

        // Fetch video IDs from the uploads playlist
        let videoIds = [];
        let nextPageToken = '';
        do {
            const response = await youtube.playlistItems.list({
                part: 'contentDetails',
                playlistId: uploadsPlaylistId,
                maxResults: 50,
                pageToken: nextPageToken
            });

            videoIds = videoIds.concat(response.data.items.map(item => item.contentDetails.videoId));
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);

        return videoIds;
    } catch (error) {
        console.error('Error fetching video IDs:', error);
        throw new Error('Error fetching video IDs');
    }
}

app.get('/api/video-ids', async (req, res) => {
    try {
        const videoIds = await fetchVideoIds();
        res.json(videoIds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

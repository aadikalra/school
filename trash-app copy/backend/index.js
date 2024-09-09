const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

app.post('/auth/google', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const user = userResponse.data;
    res.json({ user });
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response ? error.response.data : null
    });
    res.status(500).json({ error: 'Internal Server Error', details: error.response ? error.response.data : error.message });
  }
});


app.listen(3001, () => {
  console.log('Backend server listening on port 3001');
});

// import path from 'path'
const geo_api_key = "AIzaSyBOw9tq_5YKJJI4wQANJ5wYs-zo1ug-wfc";
const yelp_api_key = "mOWf4TYKViapTvZtwlO_41aoVSYGw8CqJc87fVwnAvIXqtRpnscnBSsUnM9BtLV2QkPnj63A_HxJM1PWM9m7CnMwObmFFvVwuvd_jU9fHUPEleMxZeZ6Y1PChcUmY3Yx";
const ip_key = "25a9c45e61978a";

// 'use strict';

// [START gae_node_request_example]
const express = require('express');
const axios = require('axios');
const app = express();
// var path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use(express.static(process.cwd() + "/dist/my-app/"));

app.set('trust proxy', true);


// app.get('/', (req, res) => {
//   res.status(200).send().end();
// });

// app.use('/app', express.static('./dist/my-app/index.html'));

app.get("/", (req, res) => {
  try {
    res.sendFile(
      process.cwd() + "/dist/my-app/index.html"
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/search", (req, res) => {
  try {
    res.sendFile(
      process.cwd() + "/dist/my-app/index.html"
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/bookings", (req, res) => {
  try {
    res.sendFile(
      process.cwd() + "/dist/my-app/index.html"
    );
  } catch (error) {
    console.log(error);
  }
});

// app.get('/', (req, res) => res.sendFile('./dist/my-app/index.html'));

app.get('/api/loca', async (req, res) => {
  try {
    let my_ip = req.headers['X-Forwarded-For'];//req.headers['x-forwarded-for']
    if (my_ip == undefined) {
      my_ip = req.headers['x-appengine-user-ip'];//req.headers['x-forwarded-for']
    }
    // console.log(`https://ipinfo.io/${my_ip}?token=${ip_key}`);
    // console.log(req.headers);
    const { data } = await axios.get(`https://ipinfo.io/${my_ip}?token=${ip_key}`);
    res.status(200).send(data).end();
  }
  catch (error) {
    console.log(error);
  }
});

app.get('/api/goloca', async (req, res) => {
  try {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${geo_api_key}`);
    // console.log(res);
    if (data.results.length > 0) {
      res.status(200).send(data.results[0].geometry.location).end();
    } else {
      const data2 = { "loca": "false" };
      res.status(200).send(data2).end();
    }
    console.log(res);
  }
  catch (error) {
    console.log(error);
  }
});

app.get('/api/yelp', async (req, res) => {
  try {

    const distance = parseInt(req.query.distance) * 1600;
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=${req.query.keyword}&latitude=${req.query.lat}&longitude=${req.query.lon}&categories=${req.query.category}&radius=${distance}`, {
      headers: {
        'Authorization': `Bearer ${yelp_api_key}`,
      }
    });
    res.status(200).send(data).end();//cau
  }
  catch (error) {
    console.log(error);
  }
});

app.get('/api/yelp/details', async (req, res) => {
  try {

    const { data } = await axios.get(

      `https://api.yelp.com/v3/businesses/${req.query.id}`, {

      headers: {
        'Authorization': `Bearer ${yelp_api_key}`,
      }
    });
    res.status(200).send(data).end();
  }
  catch (error) {
    console.log(error);
  }
});

app.get('/api/yelp/autocom', async (req, res) => {
  try {
    console.log(req.query.text);
    const { data } = await axios.get(

      `https://api.yelp.com/v3/autocomplete?text=${req.query.text}`, {

      headers: {
        'Authorization': `Bearer ${yelp_api_key}`,
      }
    });
    res.status(200).send(data).end();
  }
  catch (error) {
    // console.log(error);
    res.status(200).send("wsw").end();
  }
});

// app.get('/api/yelp/reviews', async (req, res) => {
//   try {

//     const { data } = await axios.get(

//       `https://api.yelp.com/v3/businesses/${req.query.id1}/reviews`, {

//       headers: {
//         'Authorization': `Bearer ${yelp_api_key}`,
//       }
//     });
//     res.status(200).send(data).end();
//     const { data1 } = await axios.get(

//       `https://api.yelp.com/v3/businesses/${req.query.id1}/reviews`, {

//       headers: {
//         'Authorization': `Bearer ${yelp_api_key}`,
//       }
//     });
//     res.status(200).send(data).end();
//   }
//   }

//   catch (error) {
//     console.log(error);
//   }
// });

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
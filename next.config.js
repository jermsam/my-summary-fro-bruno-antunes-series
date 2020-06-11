require('dotenv').config()
const path = require('path');

module.exports ={
    env:{
        MY_STEP:process.env.MY_STEP,
        URL:process.env.URL,
        API_ENDPOINT: `${process.env.URL}/api`,
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        MY_SECRET: process.env.MY_SECRET,
        SECRET:process.env.SECRET,
      },
      publicRuntimeConfig: {
        // Will be available on both server and client
      

      },
      webpack(config) {
      config.resolve.modules.push(path.resolve('./'))
      
      return config
      }
}
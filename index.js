const axios = require('axios');

exports.handler = async (event) => {
  try {
    let response;
    const httpMethod = event.httpMethod;
    const httpRoutePath = event.resource;
    
    // handling requests
    if ( httpMethod === 'GET' && httpRoutePath === '/categories' ) {
      
      response = await getData('https://www.cubyt.io/data/categories');
    } else if ( httpMethod === 'GET' && httpRoutePath === '/categories/{category}' ) {
      
      const category = event.pathParameters.category;
      response = await getData(`https://www.cubyt.io/data/categories/${category}`);
    } else {
      
      throw new Error('Invalid Route or Path Or resource...!');
    }
    
    // returning success response
    return sendResponse(200, response.data);
  } catch (error) {
    
    // returning error response
    return sendResponse(400, error.message);
  }
    
}

// formats response
async function sendResponse(statusCode, data) {
  return {
    "statusCode": statusCode,
    "isBase64Encoded": false,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(data)
  }
}

// axios function call for third party endpoint
async function getData(url) {
  return axios(url);
}

//This libary provides  a Proxy to an SAP DI OPENAPI SERVFLOW endpont
//DI user credentials are hidden in this backend service.
//NOTE:  To better secure the DI enpoint and Password  could be stored in a DESTINATION service or added in a CF User provided service

//User needs a valid JWT token to access.

// Import dependencies
import  express from "express";

// Import middlewares
import { createProxyMiddleware } from 'http-proxy-middleware';
import auth from "../middleware/auth.js";

// Setup the router for express
const router = express.Router();

// Setup DI Proxy
const DI_API_SERVICE_URL = "<RUNNING DI GRAPH SERVFLOW ENDPOINT>/openapi/service";
const DI_BASIC_USERID_PASSWORD = '<tenant>\\<userid>:<passord>'   // NOTE: needs double backslash to recognize format e.g. '<tenant>\\<userid>:<passord>'

// *************************
// Set up the route handlers
// *************************


router.use('/api1', auth, createProxyMiddleware({
    target: DI_API_SERVICE_URL,
    auth: DI_BASIC_USERID_PASSWORD ,
    headers: { "X-Requested-With" : "XMLHttpRequest"},
    //headers: { "X-Datahub-User" : "<if using alternate user graph input that userid>" , "X-Requested-With" : "XMLHttpRequest"},
    changeOrigin: true,
    pathRewrite: {
        [`.+api1`]: '',
    },
 }));


// Export the router
export default router;
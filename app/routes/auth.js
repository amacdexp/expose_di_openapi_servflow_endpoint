// This library generates a JWT Token for a validated user
// This token is need when calling the diProxy

// Import dependencies
import  jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import stringifyObj from 'stringify-object';


// Setup the express server router
const router = express.Router();

import bodyParser from 'body-parser';

// On post
router.post("/", bodyParser.json(), async (req, res) => {

    try {
        // 2 Example Users.   Run  'node app/generatePassword.js <newpassword>'  to generate new encrypted Passwords.
        const users = [{ "userid": "di_api_user1", "password": "$2a$15$B.45jbXcLk1.pDyzcuacb.wO58qPJMio6Ov2PmPOVN58ir0yMul6W" },   //Password1
                       { "userid": "di_api_user2", "password": "$2a$15$M8v392DwT1SpOdtii2R/SebTlQrTarOF2DRuJxUA4nCpf.RDgcURq" }    //Password2
            ];
        
        //NOTE:  To better secure these special api users they could be validated against an XSUAA service  or added in a CF User provided service
        
        //Set Desired Token validity e.g.: 60, "15m" , "10h", "7d"
        const tokenValidity = "365d"


        // Get to user from the database, if the user is not there return error
        let user = users.find(u => u.userid === req.body.userid);

        if (!user) throw new Error("Invalid Userid or password.");

        // Compare the password with the password in the database
        const valid = await bcrypt.compare(req.body.password, user.password)
        if (!valid) throw new Error("Invalid Userid or password.");

        const token = jwt.sign({
            id: user._id,
            roles: user.roles,
        }, "jwtPrivateKey", { expiresIn: tokenValidity });  

        res.send({
            ok: true,
            token: token
        });

    }
    catch(err) {
        console.log(err) // populated!
        res.send({
            status: "Something wrong with Userid, Password or json format",
            error: stringifyObj(err),
            postBody: stringifyObj(req.body)
        });

    } 

});

// Export the router
export default router;
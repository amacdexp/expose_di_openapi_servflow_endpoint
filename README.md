# expose_di_openapi_servflow_endpoint
expose_di_openapi_servflow_endpoint


Inspired by:

https://www.youtube.com/watch?v=Tw5LupcpKS4&t=314s 



# Initial setup

    git clone https://github.com/amacdexp/expose_di_openapi_servflow_endpoint.git

    cd app 

    npm install 

    cd .. 


# Change list of valid 'users' and 'tokenValidity' : 

    app/routes/auth.js

    NOTE: To generate encrypted password run 'node app/generatePassword.js <newpassword>'

    NOTE2:  To better secure users and avoid  could be validated against XSUAA service  or add in a CF User provided service



# Change DI endpoint (DI_API_SERVICE_URL) and DI password (DI_BASIC_USERID_PASSWORD) in:   
    app/diProxy.js

    NOTE:  To better secure the DI enpoint and Password  could be stored in a DESTINATION service or added in a CF User provided service




# Deploy App 

    cf api <SAP BTP CF API ENDPOINT>
    cf login

    cf push



# Main routes are:  

/api/getToken[POST]       :  generates a JWT Token for a validated di api user

    example json Body:
        {
            "userid": "di_api_user1",
            "password": "Password1"
        }

    NOTE: you can check the token at jwt.io      


/api/diProxy//api1  :  Proxy to a di openapi servflow endpoint  [graph needs to be running]
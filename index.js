const validateServerConfig = require('./lib/validateServerConfig/index');
const loadRoutes = require('./lib/loadRoutes/index');

class serverLogic {

    constructor() { 
        // setting express for the applications
        this.server = require('express');
         
        
    }

    serverConfigFieldsAreValid(){

        const {serverConfig} = swan.keys;
        return validateServerConfig(serverConfig);

    }


    setRoutes(app){

        return new Promise (async(resolve, reject) => {

            try {

                const {baseURI} = swan.keys.serverConfig;
                await loadRoutes(baseURI, app);
                
                resolve();

            } catch (error) {

                reject(error);

            }
            
        });

    }

    loadInitialMiddleWares (app){       
        require.main.require('./src/middlewares/index')(app);
    }

    startServer(){

        return new Promise (async(resolve, reject) => {

            const express = require('express');

            const app = express();

            this.loadInitialMiddleWares(app);

            await this.setRoutes(app);

            const port = swan.keys.serverConfig.PORT;
            
            app.listen(port, () => {
                console.log(`Listening on port ` + port);
                resolve();
            });

        })
        

    }

    initiateServer(){
        return new Promise (async (resolve, reject) => {
            
            if(!this.serverConfigFieldsAreValid()){
                console.log('Please provide your swan keys correctly')
            }
            
            try {

                await this.startServer();

                resolve();
                
            } catch (error) {

                reject(error);

            }

        })

    }
}

module.exports = serverLogic;
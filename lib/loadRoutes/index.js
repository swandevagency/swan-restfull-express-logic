const {loadRoutes, loadRoute} = require('./modules/index');

module.exports = (baseURI, app) => {

    return new Promise ((resolve, reject) => {
        //requiring path and fs modules
        const path = require('path');
        const fs = require('fs');
        
        //joining path of directory 
        const apisDirectory = path.join(`${process.cwd()}/src`, 'api');

        
        
        //passing directoryPath and callback function to require the services
        fs.readdir(apisDirectory, function (err, files) {
            //handling error
            if (err) {
                console.log('Api directory is required to initiate swan cms');
                reject(err);
            }
            files.forEach((directory) => {
                if (!directory.split('.')[1]) {
                    loadRoutes(directory).forEach((route) => {
                        if (!fs.existsSync(`${apisDirectory}/${directory}/plugin.json`)) {
                            loadRoute(baseURI, app, directory, route, null);
                        }else{
                            
                            if (!fs.existsSync(`${apisDirectory}/${directory}/controllers/${route.controller}.js`)) {
                                const {plugin} = require(`${apisDirectory}/${directory}/plugin.json`);
                                if (!plugin) {
                                    reject("Something went wrone !")
                                }
                                loadRoute(baseURI, app, directory, route, plugin);
                            }else{
                                loadRoute(baseURI, app, directory, route, null);
                            }
                            
                        }
                        
                    })
                }
            });
            resolve();
        });
    });

}
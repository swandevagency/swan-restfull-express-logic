const {loadRoutes, getMiddlewares} = require('./modules/index');

module.exports = (baseURI, app) => {

    return new Promise ((resolve, reject) => {
        //requiring path and fs modules
        const path = require('path');
        const fs = require('fs');
        
        //joining path of directory 
        const modelsDirectory = path.join(`${process.cwd()}/src`, 'api');
        
        //passing directoryPath and callback function to require the services
        fs.readdir(modelsDirectory, function (err, files) {
            //handling error
            if (err) {
                console.log('Api directory is required to initiate swan cms');
                reject(err);
            }
            files.forEach((directory) => {
                if (!directory.split('.')[1]) {
                    loadRoutes(directory).forEach((route) => {
                        eval(`
                            app.${route.method}(
                                '${baseURI}/${directory}${route.path}', 
                                ${getMiddlewares(route.middlewares)}
                                require.main.require('./src/api/${directory}/controllers/${route.controller}')
                            )`
                        );
                    })
                }
            });
            resolve();
        });
    });

}
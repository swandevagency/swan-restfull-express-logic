const getMiddlewares = (routeMiddleWares) => {
    let middlewares = ''; 
    routeMiddleWares.forEach((item) => {
        middlewares = `${middlewares}swan.middlewares.${item}, `
    });
    return middlewares;
}



const loadRoutes = (directory) => {
    return require.main.require(`./src/api/${directory}/routes.json`)
};

const loadRoute = (baseURI, app, directory, route, plugin) => {
    let routeHanddlerDirectory = "";
    if(!plugin){
        routeHanddlerDirectory = `require.main.require('./src/api/${directory}/controllers/${route.controller}')`                
    }else {
        routeHanddlerDirectory = `require.main.require('./node_modules/${plugin}/api/${directory}/controllers/${route.controller}')`
    }
    eval(`
        app.${route.method}(
            '${baseURI}/${directory}${route.path}', 
            ${getMiddlewares(route.middlewares)}
            ${routeHanddlerDirectory}
        )`
    );
}

module.exports = {
    loadRoutes,
    loadRoute
}
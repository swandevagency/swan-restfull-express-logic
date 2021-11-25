const loadRoutes = (directory) => {
    return require.main.require(`./src/api/${directory}/routes.json`)
};
const getMiddlewares = (routeMiddleWares) => {
    let middlewares = ''; 
    routeMiddleWares.forEach((item) => {
        middlewares = `${middlewares}swan.middlewares.${item}, `
    });
    return middlewares;
}

module.exports = {
    loadRoutes,
    getMiddlewares
}
const portIsValid = require('./modules/portIsValid');

module.exports = (serverConfig) => {

    if (!portIsValid(serverConfig.PORT)) {
        console.log('Please provide a valid port');
        return false;
    };

    return true;
    
}

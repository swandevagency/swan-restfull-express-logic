module.exports = (PORT) => {
    if (!PORT || typeof(PORT) !== 'number') return false;
    return true;
}
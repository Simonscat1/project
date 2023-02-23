const scope_discord = [
    'identify'
];

const options = {
    secure: true, 
    maxAge: 24 * 60 * 60 * 1000, 
    httpOnly: true,
};

module.exports = {
    scope_discord,
    options
};
require('dotenv').config();

module.exports = {
    //--------------web-site------
    port: process.env.PORT || 5001,
    client_url: process.env.CLIENT_URL,
    //--------------mongodb------
    mongodb: process.env.MONGO_DB,
    //--------------Discord-------------------------
    discord_api_url: process.env.DISCORD_API_URL,
    discord_token: process.env.DISCORD_TOKEN,
    discord_guild_id: process.env.DICSORD_GUILD_ID,
    discord_client_id: process.env.DISCORD_CLIENT_ID,
    discord_client_secret: process.env.DISCORD_CLIENT_SECRET,
    discord_callback: process.env.DISCORD_CALLBACK,
};
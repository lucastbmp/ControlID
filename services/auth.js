require("dotenv").config();
const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function login() {
    try {
        const response = await axios.post(`${process.env.API_KEY}/login.fcgi`, {
            login: process.env.ADMIN_LOGIN,
            password: process.env.ADMIN_PASSWORD
        },
        {httpsAgent: agent}
        );
        const token = response.data.session;  // Control ID uses 'session' as the key
        console.log("Token de autenticação: ", token);
        return token;  // Return the token
    } catch (error) {
        console.error("Erro ao autenticar:", error.message);
        throw error;  // Rethrow the error
    }
}

module.exports = { login };
require("dotenv").config();
const { login } = require('./services/auth');
const { getData } = require("./services/getData");


const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function main() {
    try {
        const token = await login();
        const response = await axios.post(
            `${process.env.API_KEY}/load_objects.fcgi?session=${token}`,
            {
                object: 'users'
            },
            {httpsAgent: agent}
        );
        console.log('load_objects response:', response.data);
    } catch (error) {
        console.error("Erro na requisição: ", error.response?.data || error.message);
    }
}

main();
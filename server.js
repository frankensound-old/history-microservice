const express = require("express")
require('dotenv').config()
const {connectQueue} = require("./src/controllers/middleware/messaging")
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    {
        port: 5432,
        username: process.env["USERNAME"],
        password: process.env["PASSWORD"],
        host: process.env["HOST"],
        name: process.env["NAME"],
        dialect: 'postgres',
        database: "history",
        encrypted:true
    });

const app = express();
app.use(express.json());

async function ConnectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

ConnectToDatabase();

connectQueue();

app.listen(process.env["PORT"], () => {
    console.log(`History microservice listening on port ${process.env["PORT"]}`);
})

exports.express = express;
require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    port: 5432,
    username: process.env["USERNAME"],
    password: process.env["PASSWORD"],
    host: process.env["HOST"],
    name: process.env["NAME"],
    dialect: 'postgres',
    database: "history",
    encrypted:true
});

let Record = sequelize.define('record', {
    profileId: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    songId: {
        type: Sequelize.TEXT,
        allowNull: false
    },

});

Record.sync().then(() => {
    console.log('New table created');
}).finally(() => {
})

module.exports = Record
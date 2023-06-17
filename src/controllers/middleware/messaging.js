const amqp = require('amqplib')
require('dotenv').config()
const service = require("../../services/history.service")

let channel, connection

module.exports = {
    connectQueue: async function () {
        try {

            connection = await amqp.connect("amqps://zenjpxkx:wi1QXhribj7Rpag3L9nrqCOdOFSZoIt3@hawk.rmq.cloudamqp.com/zenjpxkx", {
                username: "zenjpxkx",
                password: "wi1QXhribj7Rpag3L9nrqCOdOFSZoIt3",
                virtualHost: "zenjpxkx"
            });
            channel = await connection.createChannel();

            await channel.assertQueue(process.env["SONGS_QUEUE"]);

            await channel.consume(process.env["SONGS_QUEUE"], consumeData);

            function consumeData(data) {
                console.log("Data received : ", `${Buffer.from(data.content)}`);
                let record = JSON.parse(Buffer.from(data.content).toString());
                service.Create(record);
                channel.ack(data);
            }

        } catch (error) {
            console.log(error);
        }
    }
}
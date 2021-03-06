const dotenv = require('dotenv');
const mqtt = require('async-mqtt');

dotenv.load();

const {
  MQTT_USERNAME,
  MQTT_PASSWORD,
  MQTT_ENDPOINT,
} = process.env;

class MqttClient extends mqtt.AsyncClient {
  constructor() {
    const options = {
      clientId: `radio-pi-${Math.random(16).toString()}`,
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
    };
    console.log(MQTT_ENDPOINT);

    const client = mqtt.connect(MQTT_ENDPOINT, options);
    super(client);

    this.on('connect', this.connect);
  }

  async connect() {
    try {
      await this.subscribe('radio/get');
      await this.subscribe('radio/pause');
      await this.subscribe('radio/resume');
      await this.subscribe('radio/mute');
      await this.subscribe('radio/next');
      await this.subscribe('radio/prev');
      await this.subscribe('radio/volume');
      console.log('Connected to MQTT and subscribed to topics');
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = MqttClient;

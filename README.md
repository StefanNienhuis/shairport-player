# Shairport Player
A simple, yet elegant web interface to see what you're playing through Shairport Sync. This project uses the MQTT metadata feature from Shairport Sync.

## Installation
You'll need to build Shairport Sync with the `--with-mqtt-client` parameter for this to work.

Run `npm install` in the root directory to install the required dependencies.

## Configuration
| Parameter      | Value                                          |
|----------------|------------------------------------------------|
| Host           | The server address of your MQTT broker<br>*Example:* `192.168.1.20`     |
| Authentication | *Optional* Authentication for your MQTT broker                          |
| Topic          | The MQTT topic where the metadata is published<br>*Example:* `/Speaker` |

Configure Shairport Sync according to their documentation.

## Usage
Run `npm start` in the root directory to start the web interface. Then browse to `localhost:3000` to view it.
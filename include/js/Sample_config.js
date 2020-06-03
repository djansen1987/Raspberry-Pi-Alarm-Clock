// Homeassistant Vars
var hastate = 0 // home assistant module state 1 on, 0 off
var haToken = "token" // Long life Token
var hahostname = "HAhostname" // addres to reach homeassistant
var haprotocol = "wss" // wss for SSL - ws for non SSL

// Mqtt vars
var mqttState = 0 // MQTT module state 1 on, 0 off
var mqttBroker = ""
var mqttBrokerPort = 1883
var mqttClientName = ""
var mqttUsername = ""
var mqttPassword = ""

var noderedstate = 0 // home assistant module state 1 on, 0 off
var noderedToken = "" // Long life Token
var noderedhostname = "" // addres to reach nodered    
var noderedprotocol = "ws" // wss for SSL - ws for non SSL 
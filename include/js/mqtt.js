if (mqttState == 1){
    
    // Create a client instance
    client = new Paho.MQTT.Client(mqttBroker, Number(mqttBrokerPort), mqttClientName);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
        onSuccess:onConnect, 
        userName : mqttUsername,
        password : mqttPassword
    });
    
    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe("World");
      message = new Paho.MQTT.Message("Hello");
      message.destinationName = "World";
      client.send(message);
    }
    
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
      }
    }
    
    // called when a message arrives
    function onMessageArrived(message) {
      console.log("onMessageArrived:"+message.payloadString);
    }

}
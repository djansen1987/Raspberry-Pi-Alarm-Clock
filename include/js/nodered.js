var noderedmessageid = 1;
if(noderedstate == 1){
    
    nodered = new WebSocket(noderedprotocol+'://'+noderedhostname+'/test');
    
    nodered.onmessage = function(event) {
        nodered_msg(event.data);
    };

    nodered.onclose = function() {nodered_msg('nodered Socket closed');};
    nodered.onopen = function() {nodered_msg('nodered Connected...');};
    
    // nodered.send('{"id": '+noderedmessageid+',"type": "call_service","domain": "test","service": "test","service_data": {  "entity_id": "test"}}') 
}

function nodered_msg(str) {
    $('#msg').prepend('<p>' + str + '</p>');
    console.log(str)
};
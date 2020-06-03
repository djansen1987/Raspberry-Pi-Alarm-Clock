var hamessageid = 1;

if(hastate == 1){

    function HAmsg(str) {
        if (debug == 1){
            console.log(str)
        }
    };
    
    ha = new WebSocket(haprotocol+'://'+hahostname+'/api/websocket');
    
    ha.addEventListener('open', function (event) {
        ha.send('{"type": "auth","access_token": "'+haToken+'"}\n');
    });
    
    ha.addEventListener('open', function (event) {
        ha.send('{"id": 1, "type": "subscribe_events", "event_type": "state_changed"}\n');
    });
    
    ha.onmessage = function(event) {

        // HAmsg($.parseJSON(event.data))
        
        data = $.parseJSON(event.data).event
        // console.log(data)
        if(data){
            if(data.data.entity_id == "input_boolean.alarmclock"){
                console.log(data) 
                if(data.data.new_state.state == "on"){
                    $("#alarm-state").prop("checked", true)
                    $("#alarm-icon").show()
                    alarmstate = 1
                    audioplaying = 0
                    localStorage["alarmstate"] = alarmstate

                }else if(data.data.new_state.state == "off"){
                    alarmoff()
                    // $("#alarm-state").attr("checked", false)
                    // $("#alarm-icon").hide()
                    // alarmstate = 0
                    // audioplaying = 0
                    // localStorage["alarmstate"] = alarmstate
                }
                
            }
            if(data.data.entity_id == "input_datetime.alarmclocktime"){
                alarmtime = data.data.new_state.state.replace(":00","")
                $("#alarm-time").val(alarmtime )
                localStorage["alarmtime"] = alarmtime
                console.log(alarmtime )
            }
        }
        
    };

    ha.onclose = function() {HAmsg('Home Assistant Socket closed');};
    ha.onopen = function() {HAmsg('Home Assistant Connected...');};
    
    
    
    function homeassitant(domain,state,entity_id,data,time){
        if(data){
            console.log(data+"-update:   ",domain,state,entity_id,data,time)
            ha.send('{"id": '+hamessageid+',"type": "call_service","domain": "'+domain+'","service": "'+state+'","service_data": {  "entity_id": "'+domain+'.'+entity_id+'", "'+data+'": "'+time+'"}}')
        }else{
            ha.send('{"id": '+hamessageid+',"type": "call_service","domain": "'+domain+'","service": "'+state+'","service_data": {  "entity_id": "'+domain+'.'+entity_id+'"}}')
        }
        hamessageid ++
    }

}

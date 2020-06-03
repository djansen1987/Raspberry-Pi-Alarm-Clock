// $("#alarm-icon").hide()

setInterval(function() {
    var date = new Date();
    var cuttime =  ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) ;
    var daynumber = date.getDay();

    $('#clock-wrapper').html(cuttime);
    
    if(alarmtime == cuttime && alarmstate == 1){
        AlarmTrigger();
    }
    if(alarmstate == 1){
        $("#alarm-icon").show()
    }
    if(alarmstate == 0 && testalarm == 0){
        $("#alarm-icon").hide()
        StopAudio();
    }
    $(".day").removeClass("today")
    $("#day-"+daynumber).addClass("today")
}, 500);

Inputmask("datetime", {
    inputFormat: "HH:MM",
    max: 24
}).mask("#alarm-time");

$(document).ready(function(){

    initialalarmstate = localStorage["alarmstate"]
    alarmtime = localStorage["alarmtime"]

    if(initialalarmstate == 1){
        $("#alarm-state").prop("checked", true)
        alarmstate = 1
        $("#alarm-icon").show()
    }else if(initialalarmstate == 0){
        $("#alarm-state").prop("checked", false)
        alarmstate = 0
        $("#alarm-icon").hide()
    }
    $("#alarm-time").val(alarmtime)


    $('#alarm-state').click(function(){
        if($(this).prop("checked") == true){
            audioplaying = 0
            alarmstate = 1
            $("#alarm-icon").show()
            homeassitant("input_boolean","turn_on","alarmclock")
            localStorage["alarmstate"] = alarmstate
        }
        else if($(this).prop("checked") == false){
            alarmoff()
        }
    });
    
    $("#clock").click(function(){
        window.close();
    })
    $("#alarm-icon").click(function(){
        location.reload();
    })
    $("#alarm-time").change(function(){
        alarmtime = $("#alarm-time").val();
        localStorage["alarmtime"] = alarmtime
        homeassitant("input_datetime","set_datetime","alarmclocktime","time",alarmtime)
        console.log(alarmtime)
    })
});
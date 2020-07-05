// General Vars
var alarmstate = 0; // initial alarm state 0 1 on, off
var debug = 1 // 1 on, 2 off
var alarmtime;
var ringtones;
var ringtone; //set default ringtone
var audio;
var audioplaying = 0;
var testalarm = 0
var spotifystate = 0
var alarmclockip = "192.168.13.34"

var hastate
var mqttState
var noderedstate

if(localStorage['ringtone']){
    ringtone = localStorage['ringtone'];
}else{
    ringtone = "Gentle-wake-alarm-clock.mp3";
}

$(document).ready(function(){

    $(".ha-button").on('click',function(){
        domain = $(this).data("ha-domain")
        state = $(this).data("ha-state")
        entity_id = $(this).data("ha-entity_id").toString().replace((domain+"."),"")
        console.log(domain,state,entity_id)
        if(hastate == 1){
            homeassitant(domain,state,entity_id)
        }
        
    });
    $("#alarm-icon").hide()

    $("#btn-01").click(function(){
        console.log("#btn-01")
    })
    $("#btn-02").click(function(){
        console.log("#btn-02")
    })
    $("#btn-03").click(function(){
        console.log("#btn-03")
    })
    $("#btn-04").click(function(){
        console.log("#btn-04")
        if (audioplaying == 0){
            homeassitant("script","turn_on","1590188530681")
            audioplaying = 1
        }else{
            homeassitant("media_player","media_pause","spotify_1148145536")
            audioplaying = 0
        }
    })
    $("#btn-05").click(function(){
        $("#menu-overlay").toggle("fast");
        $("#menu-movie").show();
    })
    $("#btn-06").click(function(){
        console.log("#btn-06")
    })
    $("#btn-07").click(function(){
        getRingtones();
        $("#menu-overlay").toggle("fast");
        $("#menu-settings").show();
    })

    
    $(".closemenu").click(function(){
        HideMenus();
    })

    $(document).click(function(e){
        var container = $("#btn-07,#btn-05,#menu-settings,#menu-overlay");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0){
            HideMenus()
        }
        
    })

    function HideMenus(){
        // console.log("hide")
        $("#menu-overlay").hide("fast");
        $("#menu-settings").hide()
        $("#menu-movie").hide();

    }

    $(".playringtone").click(function(){
        if(testalarm == 0){
            $(".playringtone").removeClass("btn-success")
            $(".playringtone").addClass("btn-danger")
            $(".playringtone").text("Stop")
            testalarm = 1
            playRingtone("Audio/"+ringtone)
        }else{
            StopAudio();
        }
    })


    $("#sliderscreen").change(function(){
            $.getJSON("http://"+alarmclockip+":1880/screen?brightness="+this.value, function(result){
                console.log(result)
            });
        console.log(this.value)
    })

    $("#slidervolume").change(function(){

        $(audio).prop("volume", this.value);
        console.log(this.value)
        localStorage["alarmvolume"] = this.value
        homeassitant("media_player","volume_set","spotify_1148145536","volume_level",this.value)

    })


    $(document).keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            HideMenus()
        }
    });

    spotifystate = localStorage["spotifystate"]

    if(spotifystate == 1){
        $("#spotify-state").prop("checked", true)
        spotifystate = 1
    }else if(spotifystate == 0){
        $("#spotify-state").prop("checked", false)
        spotifystate = 0
    }

    $('#spotify-state').click(function(){
        if($(this).prop("checked") == true){
            spotifystate = 1
            // homeassitant("input_boolean","turn_on","alarmclock")
            localStorage["spotifystate"] = spotifystate
        }
        else if($(this).prop("checked") == false){
            spotifystate = 0
            localStorage["spotifystate"] = spotifystate
        }
    });
    $('#togglespotify').click(function(){
        homeassitant("media_player","media_play_pause","spotify_1148145536")
    });
    $('#SkipNetflix').click(function(){
        homeassitant("media_player","media_seek","slaapkamer_2","seek_position","180")
    });
    $('#pauseplayNetflix').click(function(){
        homeassitant("media_player","media_play_pause","slaapkamer_2")
    });
    $('#stopNetflix').click(function(){
        homeassitant("media_player","media_stop","slaapkamer_2")
    });
    $('#poweroff').click(function(){
        $.getJSON("http://"+alarmclockip+":1880/power?off=1", function(result){
            console.log(result)
        })
    });
    $('#reboot').click(function(){
        $.getJSON("http://"+alarmclockip+":1880/reboot?reboot=1", function(result){
            console.log(result)
        })
    });
    
    // Numpad
    $.fn.numpad.defaults.buttonNumberTpl =  '<button type="button" class="btn btn-default"></button>';
    $.fn.numpad.defaults.buttonFunctionTpl = '<button type="button" class="btn" style="width: 100%;"></button>';
    $('#alarm-time').numpad({
            hidePlusMinusButton: true,
            positionX: "right",
            decimalSeparator: ":",
            hideDecimalButton: true,
            hidePlusMinusButton: true
        }
    );

;


// Hide menu when no input for 10 sec
 
var timeoutInMiliseconds = 10000;
var timeoutId; 
  
function startTimer() { 
    // window.setTimeout returns an Id that can be used to start and stop a timer
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
  
function doInactive() {
    HideMenus()

}
 
function resetTimer() { 
    window.clearTimeout(timeoutId)
    startTimer();
}

function setupTimers () {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
     
    startTimer();
}

setupTimers();


});

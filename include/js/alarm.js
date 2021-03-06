if(localStorage["alarmvolume"]){
    initialalarmsvolume = localStorage["alarmvolume"]
    $("#slidervolume").val(initialalarmsvolume)
}else{
    initialalarmsvolume = 1
}

audio = new Audio();
$(audio).prop("volume", initialalarmsvolume);

function AlarmTrigger(){
    if(spotifystate == 1){
        if(audioplaying == 0){
            homeassitant("script","turn_on","1590188530681")
            $("#btn-04").removeClass('green')
            $("#btn-04").removeClass('orange')
            $("#btn-04").addClass('green')
            audioplaying = 1
            spotifyplaying = 1
        }
    }else{
        if(audioplaying == 0){
            console.log("alarm triggerd")
            playRingtone("Audio/"+ringtone)
        }
    }
    audioswitch(1)
}

function playRingtone(ringtonesource) {
    if(audioplaying == 0){
        audioplaying = 1	
        audio.src = ringtonesource;
        audio.play();
    }
    audio.onended = function() {
        StopAudio();
    };
}

function getRingtones(){
    $("#ringtones").empty()
    ringtones = new Array();
    $.ajax({
      url: "Audio/",
      success: function(data){
         $(data).find("td > a").each(function(i){
            filename = $(this).attr("href")
            
            if(openFile(filename)&& filename == ringtone){
                ringtones.push($(this).attr("href"));
                $("#ringtones").append($('<option selected data-url="'+filename+'" />').val("ringtone"+i).text(filename));
            }else if(openFile(filename)){
                ringtones.push($(this).attr("href"));
                $("#ringtones").append($('<option data-url="'+filename+'" />').val("ringtone"+i).text(filename));
            }         
         });
      }
    }); 
    console.log(ringtones);
    function openFile(file) {
        var extension = file.substr( (file.lastIndexOf('.') +1) );
        switch(extension) {
            case 'mp3':
            case 'mp4':
            case 'wav':
                return true;
                break;
            default:
                return false;
        }
    };
}


$("#ringtones").change(function(){
    localStorage['ringtone'] = $("#ringtones option:selected").data("url")
    ringtone = $("#ringtones option:selected").data("url")
    console.log(localStorage['ringtone'])
    StopAudio();
})

function StopAudio(){
    if(audioplaying == 1){
        audioplaying = 0
        if(testalarm == 1){
            testalarm = 0
            $(".playringtone").removeClass("btn-danger")
            $(".playringtone").addClass("btn-success")
            $(".playringtone").text("Luisteren")
        }
        audio.pause()
    }
}

$("#clock-wrapper").click(function(){
    if(audioplaying == 1){
        // alarmoff()
    }
})

function alarmoff(){
    alarmstate = 0
    if(audioplaying == 1){
        audioplaying = 0
        audioswitch(0)
        if(spotifystate == 1){
            // homeassitant("media_player","media_pause","spotify_1148145536")
            $("#btn-04").removeClass('green')
            $("#btn-04").addClass('orange')
            // homeassitant("media_player","media_pause","spotify_1148145536")
            $.ajax({
                url: "https://hooks.nabu.casa/gAAAAABfAfNjaiFfBX960e2kxHehjxV9CSFK4aYhCHbiDyYrePr_tHiF5_-TMEix4jiUGqZltTiT741KBOZKbA6YOg5Q-5rX92n0F0iEUdMUM14ntMhSSZd2T4nmJeJ-b5hgJ8oeZmx9rDOH9sMMjStr6Vsw8tVWXLx6NlD06zrd6EYzohbbWjE=",
                type: "POST",
                complete: function(){
                    $("#btn-04").removeClass('green')
                    $("#btn-04").removeClass('orange')
                    console.log("Spotify stopped succesfull")
                }
            });
            audioswitch(0)
            spotifyplaying = 0
        }
        $("#alarm-state").prop("checked", false)
        $("#alarm-icon").hide()
        homeassitant("input_boolean","turn_off","alarmclock")
        StopAudio()
        localStorage["alarmstate"] = alarmstate
    }
}

function audioswitch(status){
    $.getJSON("http://"+alarmclockip+":1880/audio?val="+status, function(result){
        console.log(result)
    })
}
$(document).ready(function() {
    $.getScript("functions.js");
   
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
    var noOfTries = 1;

    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
  
    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function(event) {
        
        var snapshotContext = snapshotCanvas.getContext('2d');

        //draw image to canvas. scale to target dimensions
        snapshotContext.drawImage(video, 0, 0, video.width, video.height);

        //convert to desired file format
        var dataURI = snapshotCanvas.toDataURL('image/jpeg'); // can also use 'image/png'

        if(sendPhotoForFaceRecognition == true){
            console.log("here")
            jQuery.ajax ({
                url: FaceRecognitionBackend + "predict",
                type: "POST",
                data: JSON.stringify({imguri: dataURI}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(employee){
                    console.log(employee)
                    if(employee.employeeId == -1){
                        $(".employeeImage").attr("src", SystemBackend + "images/userProfile.jpg");
                       // $(".employeeName").html("Hello! Please look in front of the camera.");
                        $(".hello").html("");
                        if(noOfTries == 1 && sessionStarted == false){
                            say("I am sorry I could not recognize your face, could you please come close to the camera ?");
                            noOfTries = 2;
                        }else if(noOfTries ==2  && sessionStarted == false) {
                            say("I am so sorry I could not again recognize your face, could you please come close to the camera?");
                            noOfTries = 3;
                        }else if(noOfTries == 3 && sessionStarted == false){
                            say("I am sorry the system can not recognize your face, how may I help you ?");
                            noOfTries = 1;
                            sessionStarted = true;
                            startConversation();
                        }
                        
                    } else {
                      
                    getEmployeeData(employee.employeeId);
            
            }
        }
        });
        
            sendPhotoForFaceRecognition = false;
        }
       
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        });
    });
});



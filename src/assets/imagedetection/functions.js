
var SystemBackend = "http://localhost:8080/";
var FaceRecognitionBackend = "http://localhost:5000/";
var sessionStarted = false;
var sendPhotoForFaceRecognition = true;
var faceRecognized = false;



// Create a global accesible instance of artyom
window.artyom = new Artyom();

setInterval(function() { 
    
    sendPhotoForFaceRecognition = true;
    
    }, 8000);


var say = function (statement) {
    
    var voices = window.speechSynthesis.getVoices();
    var intializeVoiceGreeting = new SpeechSynthesisUtterance(statement);
    intializeVoiceGreeting.voice = voices.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
    window.speechSynthesis.speak(intializeVoiceGreeting);
    
};

var startConversation = function() {
    say("Do you want me to call an employee for you ? if yes please say the first or the last name of the employee.")
    setInterval(function() { 
        console.log("started listening")
        listen(0);

        },9000);
    
    }

var listen = function(tryingNo) {
    artyom.initialize({
        lang:"en-GB",// More languages are documented in the library
        continuous:false,//if you have https connection, you can activate continuous mode
        debug:true,//Show everything in the console
        listen:true // Start listening when this function is triggered
        });
        artyom.addCommands({
            smart:true,
            indexes:["*"], 
            action:function(i, firstOrLastName){
               
                askEmployeeToCome(firstOrLastName, tryingNo);
            }
          });
          artyom.fatality();
}

var askEmployeeToCome = function(firstOrLastName, tryingNo) {
    $.ajax ({
        url: SystemBackend + "employee/byFirstOrLastName/" + firstOrLastName,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(employees) {
            var listOfEmployees = employees.result;
           // showAvailableEmployees(listOfEmployees);
            
            if(listOfEmployees.length > 1) {
               say("Here is the list of employees available ");
               listEmployees(listOfEmployees);
               say("Also you can see the names on the screen");
               say("let me know which one you would like me to call");
               
               showAvailableEmployees(listOfEmployees);

            }else if(listOfEmployees.length == 1){
                
                say("Here is the available employee with the name ");
                listEmployees(listOfEmployees);
                say("You can see the details on the screen");
                say("You can call him if you want, or I can send him an email if you want");
                say("Do you want me to send him an email ?");
                listenToSendEmail();
                showAvailableEmployees(listOfEmployees);
                
            }else {
                if(tryingNo == 0){
                    say("I am sorry there is no employees with the name "+firstOrLastName);
                    say("Could you please say the first or last name again so I can try to find the employee again ?");
                    listen(1);                    
                }else{
                    say("I am sorry there is no employees with the name "+firstOrLastName)
                  sessionStarted = false;  
                }
            }
            
        }}); 
}
var listenToSendEmail = function(){
    say("An email has been sent to him, he will be with you shortly");
}
var listEmployees = function(listOfEmployees) {
    
    for (var i = 0; i < listOfEmployees.length; i++) {
        
        say(listOfEmployees[i].firstName + " "+listOfEmployees[i].lastName+ ", with phone number  "+listOfEmployees[i].phone);
        
    }
        //console.log("employees string : "+employees);
    //return employees;
};



var showAvailableEmployees = function(listOfEmployees) {
   // employees = $.parseJSON(listOfEmployees);

    $.each(listOfEmployees, function(i, item) {
            var $tr = $('<tr>').append(
                $('<td>').text(i),
                $('<td>').text(item.firstName),
                $('<td>').text(item.lastName),
                $('<td>').text(item.phone)
            
            );
            $('#employeesTable').removeClass("hidden");
            $('#employeesTable').append($tr);
            
        });
    
}

var getEmployeeData = function(employeeId){
    $.ajax ({
    url: SystemBackend + "employee/" + employeeId,
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(employee) {
        if(employee.result != null) {
            $(".employeeImage").attr("src", SystemBackend + "images/" + employee.result.picture);
            $(".employeeName").html("Welcome "+employee.result.firstName+" "+employee.result.lastName);
            $(".hello").html("");
            if(faceRecognized == false){
                say("Welcome" + employee.result.firstName);       
                faceRecognized = true;
            }
            
        }else{
            $(".employeeImage").attr("src", SystemBackend + "images/userProfile.jpg");
            $(".employeeName").html("Hello! Please look in front of the camera.");
            say("The system can not recognize your face. How may I help you?");
            
        }
        
    }});
}



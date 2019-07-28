$( document ).ready(function() {
   

  var firebaseConfig = {
    apiKey: "AIzaSyAurkYKmD_MRe6m2ckcJJa4yFXL0Uqn8sw",
    authDomain: "trainactivity-eb718.firebaseapp.com",
    databaseURL: "https://trainactivity-eb718.firebaseio.com",
    projectId: "trainactivity-eb718",
    storageBucket: "",
    messagingSenderId: "883419995244",
    appId: "1:883419995244:web:7a4680e57d8fc727"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    //     // VARIABLES
    // --------------------------------------------------------------------------------
    var database = firebase.database();

    // Initial Variables (SET the first set IN FIREBASE FIRST)
    var TrainName;
    var Destination;
    var Frequency;

    var TrainTime = [];
    var counter;
    var HH; 
    var MM;
    var now = new Date();
    var mins = now.getMinutes();
    var secs = now.getSeconds();
    var hours = now.getHours();
    var timenowmin = Number(hours)*60+Number(mins);
    

    // Click Button changes what is stored in firebase
    $("#click-button").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs
      TrainName = $("#TrainNameInput").val().trim();
      Destination = $("#Destinationinput").val().trim();
      Frequency = $("#FrequencyInput").val().trim();
      TrainTime = $("#TrainTime").val().toLowerCase().trim();

      // Change what is saved in firebase
      database.ref().push({
        TrainName: TrainName,
        Destination: Destination,
        Frequency: Frequency,
        TrainTime: TrainTime,
      });
      
    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("child_added", function(snapshot) {
      console.log(firebase.database().ref());

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val(). TrainName);
      console.log(snapshot.val().Destination);
      console.log(snapshot.val().Frequency);
      console.log(hours+ ":" + mins+":"+ secs);
     var uno = Number(snapshot.val().Frequency); 
      


    //  lines 74-138 just to find out next arriving time of the train
      setupinterval ();
      
      function setupinterval (){
        counter = Number(snapshot.val().TrainTime.split(":")[0])*60+Number(snapshot.val().TrainTime.split(":")[1]);
        setfirstinterval ();
      }
      function setfirstinterval (){
        
        if (counter>1440){
          counter=counter-1440;
          arrivalnext();
       
        }
        else {
          counter = counter+Number(snapshot.val().Frequency);
          setfirstinterval ();
        }
      }

      function arrivalnext(){
        if (Number(counter)>=Number(timenowmin)){
          counter=Number(counter)-Number(timenowmin);
         
        }
        else {
          counter=Number(counter)+Number(snapshot.val().Frequency);
          arrivalnext();
        }
      }
      
      timeconverter();

      function timeconverter(){
        if (Number(hours) >12){
          HH=Number(hours)-12;
          MM = Number(mins);
        }
        else {
          HH = Number(hours)
          MM = Number(mins);
        }
      }

      nexttrainarrives(); 

      function nexttrainarrives(){
        if (MM+counter>=60){
          HH=HH+1;
          MM=MM+Number(counter)-60;
        }
        else {
        MM = MM+Number(counter);
        }
      }

      militaryconverter();

      function militaryconverter(){
        if (Number(hours) >12){
          MM=MM+"PM";
        }
        else {
          MM=MM+"AM";
        }
      }

      // creating html tags to place values from database
     
      var html = ` <tr>
        <td>${snapshot.val().TrainName}</td>
        <td>${snapshot.val().Destination}</td>
        <td>${snapshot.val().Frequency}</td>
        <td>${HH+":"+MM}</td>
        <td>${counter}</td>
            </tr> `
        $("#sheet").append(html);
      // If any errors are experienced.../  logging errors .
      }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      });
   
    
    // this function will be counting months from start day untill today
    
    
});



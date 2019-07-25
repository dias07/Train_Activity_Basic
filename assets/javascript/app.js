$( document ).ready(function() {
   
    var config = {
      apiKey: "AIzaSyD-twK5xLb6HN1arR3b9zrsJJeDmFIq80o",
      authDomain: "myfirstproject-f81f4.firebaseapp.com",
      databaseURL: "https://myfirstproject-f81f4.firebaseio.com",
      projectId: "myfirstproject-f81f4",
      storageBucket:  "fir-click-counter-7cdb9.appspot.com",
      messagingSenderId: "674705617727",
      appId: "1:674705617727:web:97659f086d8e1730"
    };
    // Initialize Firebase
    firebase.initializeApp(config);
    //     // VARIABLES
    // --------------------------------------------------------------------------------
    var database = firebase.database();

    // Initial Variables (SET the first set IN FIREBASE FIRST)
    var Emname;
    var Role;
    var StartDate;
    var MonthlyRate;

    // Click Button changes what is stored in firebase
    $("#click-button").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs
      Emname = $("#employeeNameInput").val().trim();
      Role = $("#Roleinput").val().trim();
      StartDate = $("#startDateInput").val().trim();
      MonthlyRate =$("#monthlyRateInput").val().trim();

      // Change what is saved in firebase
      database.ref().push({
        Emname: Emname,
        Role: Role,
        StartDate: StartDate,
        MonthlyRate: MonthlyRate
      });
    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("child_added", function(snapshot) {
      console.log(firebase.database().ref());

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val(). Emname);
      console.log(snapshot.val().Role);
      console.log(snapshot.val().StartDate);
      console.log(snapshot.val().MonthlyRate);

      // creating html tags to place values from database
      var html = ` <tr>
                <td>${snapshot.val().Emname}</td>
                <td>${snapshot.val().Role}</td>
                <td>${snapshot.val().StartDate}</td>
                <td>${monthDiff(new Date(snapshot.val().StartDate), new Date())}</td>
                <td>${snapshot.val().MonthlyRate+"$"}</td>
                <td>${snapshot.val().MonthlyRate*12+"$"}</td>
                    </tr> `
      $("#sheet").append(html);
             
                  
      
      // If any errors are experienced.../  logging errors .
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    // this function will be counting months from start day untill today
    function monthDiff(dateFrom, dateTo) {
      return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    }
});
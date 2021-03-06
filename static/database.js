//socket stuff
var socket;

$(document).ready(function() {

    
    socket = io.connect('http://' + document.domain + ':' + location.port);

    //create the connection to Firebase
    var myDataRef = new Firebase('https://boiling-heat-3848.firebaseio.com/');

    //--SIGNUP--LOGIN--//
    //submit login
    $('#signup').click(function (e) {
	//user inputed email/pw combination
	var name = $('#emailInput').val();
	var pw = $('#passwordInput').val();

	//add email/pw to Firebase, if possible
	myDataRef.createUser({
	    email: name,
	    password: pw
	}, function(error, userData) {
	    if (error) {
		switch (error.code) {
		case "EMAIL_TAKEN":
		    console.log("This email is already being used.");
		    break;
		case "INVALID_EMAIL":
		    console.log("Invalid email.");
		    break;
		default:
		    console.log("Error creating user:", error);
		}
	    } else {
		console.log("Successfully created account: " + name);
	    }
	});

    });

    $('#login').click(function (e) {
	//user inputed email/pw combination
	var name = $('#emailInput').val();
	var pw = $('#passwordInput').val();
	myDataRef.authWithPassword({
	    "email": name,
	    "password": pw
	}, function(error, authData) {
	    if (error) {
		console.log("Email or password incorrect.", error);
	    } else {
		console.log("Login successful! Welcome " + name, authData);
		/*triggers 'login' python function, send email and password*/
		socket.on('connect', function() {
		    console.log("its working");
		    socket.emit('login', {email : name, password : pw});
		});
	    }
	});
	
    });

});

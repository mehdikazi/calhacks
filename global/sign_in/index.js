// Import accounts somehow here.

function signupSubmitted() {
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var userName = document.getElementById('userName').value;
  var emailAddress = document.getElementById('emailAddress').value;
  var password1 = document.getElementById('password1').value;
  var password2 = document.getElementById('password2').value;
  
  alert("hello, " + firstName);

  Accounts.createUser({
      username: userName,
      password: password1,
      profile: {
        name: firstName
        // Other required field values can go here
      }
    }, function(error) {
      if (error) {
        alert("Failure occured...");
      }
    });
}
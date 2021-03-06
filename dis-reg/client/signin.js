Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    alert("This actually worked!");
    event.preventDefault();
    Accounts.createUser({
      username: template.find("#signup-username").value,
      password: template.find("#signup-password").value,
      profile: {
        name: template.find("#signup-name").value
        // Other required field values can go here
      }
    }, function(error) {
      if (error) {
        // Display the user creation error to the user however you want
      }
    });
  }
});

// Template.loginForm.events({
//   "submit #login-form": function(event, template) {
//     event.preventDefault();
//     Meteor.loginWithPassword(
//       template.find("#login-username").value,
//       template.find("#login-password").value,
//       function(error) {
//         if (error) {
//           // Display the login error to the user however you want
//         }
//       }
//     );
//   }
// });

// Template.logoutForm.events({
//   "submit #logout-form": function(event, template) {
//     event.preventDefault();
//     Meteor.logout(function(error) {
//       if (error) {
//         // Display the logout error to the user however you want
//       }
//     });
//   }
// });
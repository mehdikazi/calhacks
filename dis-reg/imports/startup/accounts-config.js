import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
});

//http://stackoverflow.com/questions/20833631/how-to-create-custom-login-fields-in-meteor
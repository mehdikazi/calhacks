import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
  user.first_name = options.first_name;
  user.last_name = options.last_name;
  user.admin_regs = options.admin_regs;
  user.saved_regs = options.saved_regs;
  // Don't forget to return the new user object at the end!
  return user;
});
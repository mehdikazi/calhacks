import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Registries = new Mongo.Collection('registries');
 
Meteor.methods({
  'registries.insert' (name, items, r_name, r_address, r_background, expiration) {
    check(name, String);
    check(items, Mongo.Collection);
    check(r_name, String);
    check(r_address, String);
    check(r_background, String);
    // Check expiration here.

 
    // Make sure the user is logged in before creating a registry
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    // admins = new Mongo.Collection('admins');
    // admins.insert({userId: Meteor.userId()});

    // users = new Mongo.Collection('users');
    // users.insert({userId: Meteor.userId()});
    var users = [Meteor.userId()];

    const newDate = new Date();
    var expire_date = new Date(newDate.getTime() + 30 * (24 * 60 * 60 * 1000));

    var recipient = {name: r_name, address: r_address, background: r_background};

    var transactions = [];

    Registries.insert({
      name: name,
      items: items,
      createdAt: newDate,
      expirationDate: expire_date,
      // admins: admins,
      admin: Meteor.userId(),
      active_users: users,
      r_info: recipient,
      transactions: transactions,
    });

  /*
  db.registries.insert("Barn Fire", {}, "Alex", "Kentucky", "My barn house burned down due to an unfortuante series of barbeques, culminating in a bright flash of fire that enveloped my barn, vaporizing it instantly. :(", "tomorrow")
  */
  },

  'registries.remove' (regId) {
    check(regId, String);
    Registries.remove(regId);
  },

  'registries.addActiveUser' (regId, userId) {
    regEntry = Registries.findOne(regId);
    users = regEntry.active_users;
    if (!(users.find(userId).count() > 0)) {
      users.insert({userId: userId});
      Registries.update(
        { _id: regId },
        {
          $set: {
            active_users: user;
          }
        })
    }
  },
});

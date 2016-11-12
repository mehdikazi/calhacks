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

    users = new Mongo.Collection('users');
    users.insert({userId: Meteor.userId()});

    newDate = new Date();
    expire_date = new Date(newDate.getTime() + 30 * (24 * 60 * 60 * 1000));

    var recipient = {name: r_name, address: r_address, background: r_background};

    Registries.insert({
      name: name,
      items: items,
      createdAt: newDate,
      expirationDate: expire_date,
      // admins: admins,
      admin: Meteor.userId(),
      active_users: users,
      r_info: recipient,
    });
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
        { regId: regId },
        {
          $set: {
            active_users: user;
          }
        })
    }
  }
});

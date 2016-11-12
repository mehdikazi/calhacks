import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Registries = new Mongo.Collection('registries');
 
Meteor.methods({
  'registries.insert' (reg_id, registry) {
    check(reg_id, String);
    // check(registry, Mongo.Collection)
 
    // Make sure the user is logged in before creating a registry
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    list = new Mongo.Collection('admins');
    list.insert({userId: Meteor.userId()});
 
    new_date = new Date()

    expire_date = new Date(new_date.getTime() + 30 * (24 * 60 * 60 * 1000));

    Registries.insert({
      regId: reg_id,
      createdAt: new_date,
      expirationDate: expire_date,
      registry: registry,
      admins: list,
    });
  },

  'registries.remove' (reg_id) {
    check(reg_id, String);
 
    const task = Tasks.findOne(reg_id);
    Registries.remove(reg_id);
  },
});

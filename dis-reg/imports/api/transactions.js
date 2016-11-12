import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Transactions = new Mongo.Collection('transactions');
 
Meteor.methods({
  'transactions.insert' (trackingNumber, productIds, registryId) {
    check(trackingNumber, String);
    check(productIds, Array);
    check(registryId, String);
 
    // Make sure the user is logged in before a transaction
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    const purchaseDate = new Date();

    Transactions.insert({
      trackingNumber: trackingNumber,
      transactionDate, purchaseDate,
      productIds: productIds,
      registryId: registryId,
    });
  },

  'transactions.remove' (transactionId) {
    check(transactionId, String);
    transactions.remove(transactionId);
  },
});

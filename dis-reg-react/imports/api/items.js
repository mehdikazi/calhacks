import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Items = new Mongo.Collection('items');
 
Meteor.methods({
  'items.insert' (query, quantityRequested, numberBought, priority, registryId) {
    check(query, String);
    check(quantityRequested, Number);
    check(numberBought, Number);
    check(priority, Number);

    Items.insert({
      query: query,
      quantityRequested: quantityRequested,
      numberBought: numberBought,
      priority: priority,
      registryId: registryId,
    });

  },

  'items.remove' (itemId) {
    check(itemId, String);
    items.remove(itemId);
  },

  'items.updateQuantity' (query, amountPurchased) {
    var item = items.findOne({query: query});
    Items.update(
      { query: query },
      {
        $set: {
          numberBought: item.numberBought + amountPurchased; //????
        }
      })
  },

  'items.updateQuantities' (purchaseDict) {
    for (var key in purchaseDict) {
     Meteor.call('items.updateQuantity', key, purchaseDict[key]);
    }
  }
});

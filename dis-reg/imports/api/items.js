import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Items = new Mongo.Collection('items');
 
Meteor.methods({
  'items.insert' (keyWord, quantityRequested, numberBought, priority, registryId) {
    check(keyWord, String);
    check(quantityRequested, Number);
    check(numberBought, Number);
    check(priority, Number);

    Items.insert({
      keyWord: keyWord
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

  'items.updateQuantity' (itemId, amountPurchased) {
    var item = items.findOne(itemId);
    Items.update(
      { _id: itemId },
      {
        $set: {
          numberBought: item.numberBought + amountPurchased; //????
        }
      })
  },
});

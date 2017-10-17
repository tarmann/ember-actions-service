import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  get,
  String: { capitalize }
} = Ember;

export default Ember.Service.extend({

  resource: null,

  send(model, action, ...options){
    const store = get(this, 'store');
    const callbackName = `on${capitalize(action)}${capitalize(get(this, 'resource'))}`;
    return get(this, `${action}Task`).perform(store, callbackName, model, ...options);
  },

  createTask: task(function * (store, callback){
    const model = yield store.createRecord( get(this, 'resource') );
    return { callback, model };
  }),

  saveTask: task(function * (store, callback, model){
    yield model.save();
    return { callback, model };
  }),

  rollbackTask: task(function * (store, callback, model){
    yield model.rollbackAttributes();
    return { callback, model };
  }),

  deleteTask: task(function * (store, callback, model){
    yield model.destroy();
    return { callback, model };
  })

});

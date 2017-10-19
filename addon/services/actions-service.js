import Ember from 'ember';
import { task } from 'ember-concurrency';

const { get, String: { capitalize } } = Ember;

export default Ember.Service.extend({

  resource: null,

  send(store, model, action, ...options){
    const callbackName = `on${capitalize(action)}${capitalize(get(this, 'resource'))}`;
    const task = get(this, `${action}Task`);

    if(!task){
      throw new Error(`Task ${action} not found for ${get(this, 'resource')}.`);
    } else {
      return task.perform(store, callbackName, model, ...options);
    }
  },

  findAllTask: task(function * (store, callback){
    const model = yield store.findAll( get(this, 'resource') );
    return { callback, model };
  }),

  createTask: task(function * (store, callback){
    const model = yield store.createRecord( get(this, 'resource') );
    return { callback, model };
  }),

  saveTask: task(function * (store, callback, model){
    yield model.save();
    return { callback, model };
  }),

  deleteTask: task(function * (store, callback, model){
    yield model.destroy();
    return { callback, model };
  }),

  unloadTask: task(function * (store, callback, model){
    yield store.unloadRecord(model);
    return { callback, model };
  }),

  rollbackTask: task(function * (store, callback, model){
    yield model.rollbackAttributes();
    return { callback, model };
  })

});

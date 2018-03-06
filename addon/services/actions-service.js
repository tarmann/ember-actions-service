import Ember from 'ember';
import { task } from 'ember-concurrency';

const { get, String: { capitalize, camelize } } = Ember;

export default Ember.Service.extend({

  resource: '',

  beforeSend(){},

  afterSend(){},

  send(store, model, action, ...options){
    const task = get(this, `${action}Task`);
    const callback = `on${capitalize(action)}${capitalize(camelize(get(this, 'resource')))}`;

    Ember.assert(`Invalid actions-service resource name.`, !Ember.isEmpty( get(this, 'resource') ));
    Ember.assert(`Store invalid for ${get(this, 'resource')} actions-service.`, Ember.typeOf(action) === 'string');
    Ember.assert(`Must provide a valid action for ${get(this, 'resource')}.`,  Ember.typeOf(action) === 'string');
    Ember.assert(`Task ${action} not found for ${get(this, 'resource')}.`, task);

    this.beforeSend(...arguments);

    return task.perform(store, callback, model, ...options);
  },

  findTask: task(function * (store, callback, model, id){
    model = yield store.findRecord( get(this, 'resource'), id );
    return { callback, model };
  }),

  findAllTask: task(function * (store, callback){
    const model = yield store.findAll( get(this, 'resource') );
    return { callback, model };
  }),

  createTask: task(function * (store, callback, _model, attrs){
    const model = yield store.createRecord( get(this, 'resource'), attrs || {} );
    return { callback, model };
  }),

  saveTask: task(function * (store, callback, _model){
    const model = _model.save ? _model : store.peekRecord( get(this, 'resource'), get(_model, 'id') );
    yield model.save();
    return { callback, model };
  }),

  createAndSaveTask: task(function * (store, callback, _model, attrs){
    const model = yield store.createRecord( get(this, 'resource'), attrs || {} );
    yield model.save();
    return { callback, model };
  }),

  deleteTask: task(function * (store, callback, _model){
    const model = _model.destroyRecord ? _model : store.peekRecord( get(this, 'resource'), get(_model, 'id') );
    yield model.destroyRecord();
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

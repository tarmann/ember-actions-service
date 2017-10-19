import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

moduleFor('service:actions-service', 'Unit | Service | actions service', {
  // Specify the other units that are required for this test.
  // needs: ['service:store'],

  beforeEach(){
    this.store = {
      createRecord: sinon.spy(),
      unloadRecord: sinon.spy()
    }

    this.model = {
      save: sinon.spy(),
      destroy: sinon.spy(),
      rollbackAttributes: sinon.spy()
    }

    this.service = this.subject({
      store: this.store,
      resource: 'user',
      customTask: { perform: sinon.spy() }
    });
  }
});

test('it exists', function(assert) {
  assert.ok(this.service);
});

test('store', function(assert) {
  assert.ok( this.service.get('store'),
    'it has access to the store' );
});

test('resource', function(assert) {
  assert.ok( this.service.get('resource'), 'user' );
});

test('send', function(assert) {
  this.taskInstance = this.service.send(this.store, this.model, 'custom');
  assert.ok( this.service.customTask.perform.calledOnce,
    'it routes to a task' );

  Ember.run(() => { this.task = this.service.send(this.store, this.model, 'create'); });
  assert.equal( this.task.isSuccessful, true,
    'it returns a task instance' );

  this.taskName = 'doSomething';
  assert.throws(() => { this.service.send(this.store, this.model, this.taskName) },
    'throws on undefined tasks');

  assert.throws(() => { this.service.send(this.store, this.model)
  }, 'throws on empty task name');

  Ember.run(() => { this.task = this.service.send(this.store, this.model, 'create'); });
  assert.equal( this.task.isSuccessful, true,
    'it returns a task instance' );
});

test('createTask', function(assert) {
  Ember.run(() => {
    this.task = this.service.send(this.store, null, 'create');
  });

  assert.ok( this.store.createRecord.calledWith( this.service.resource ),
    'it creates the model' );
});

test('savesTask', function(assert) {
  Ember.run(() => {
    this.task = this.service.send(this.store, this.model, 'save');
  });

  assert.ok( this.model.save.calledOnce,
    'it saves the model' );
});

test('deleteTask', function(assert) {
  Ember.run(() => {
    this.task = this.service.send(this.store, this.model, 'delete');
  });

  assert.ok( this.model.destroy.calledOnce,
    'it deletes the model' );
});

test('unloadTask', function(assert) {
  Ember.run(() => {
    this.task = this.service.send(this.store, this.model, 'unload');
  });

  assert.ok( this.store.unloadRecord.calledWith(this.model),
    'it unloads the model' );
});

test('rollbackTask', function(assert) {
  Ember.run(() => {
    this.task = this.service.send(this.store, this.model, 'rollback');
  });

  assert.ok( this.model.rollbackAttributes.calledOnce,
    'it rollbacks the model' );
});


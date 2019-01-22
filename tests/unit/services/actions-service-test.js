import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Service | actions service', function(hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  // needs: ['service:store'],

  hooks.beforeEach(function() {
    this.store = {
      createRecord: sinon.spy(),
      unloadRecord: sinon.spy(),
      findRecord: sinon.spy(),
      peekRecord: sinon.spy()
    }

    this.model = {
      save: sinon.spy(),
      destroyRecord: sinon.spy(),
      rollbackAttributes: sinon.spy()
    }

    this.service = this.owner.factoryFor('service:actions-service').create({
      store: this.store,
      resource: 'user-account',
      customTask: { perform: sinon.spy() }
    });
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

    run(() => { this.task = this.service.send(this.store, this.model, 'create'); });
    assert.equal( this.task.isSuccessful, true,
      'it returns a task instance' );

    this.taskName = 'doSomething';
    assert.throws(() => { this.service.send(this.store, this.model, this.taskName) },
      'throws on undefined tasks');

    assert.throws(() => { this.service.send(this.store, this.model)
    }, 'throws on empty task name');

    run(() => { this.task = this.service.send(this.store, this.model, 'create'); });
    assert.equal( this.task.isSuccessful, true,
      'it returns a task instance' );

    let sendResponse;
    run(() => {
      this.service.send(this.store, this.model, 'save', this.model)
                  .then(r => { sendResponse = r });
    });
    assert.equal( sendResponse.model, this.model,
      'it returns a model' );
    assert.equal( sendResponse.callback, 'onSaveUserAccount',
      'it returns a callback' );
  });

  test('createTask', function(assert) {
    run(() => {
      this.task = this.service.send(this.store, null, 'create');
    });

    assert.ok( this.store.createRecord.calledWith( this.service.resource ),
      'it creates the model' );
  });

  test('savesTask', function(assert) {
    run(() => {
      this.task = this.service.send(this.store, this.model, 'save');
    });

    assert.ok( this.model.save.calledOnce,
      'it saves the model' );
  });

  test('deleteTask', function(assert) {
    run(() => {
      this.task = this.service.send(this.store, this.model, 'delete');
    });

    assert.ok( this.model.destroyRecord.calledOnce,
      'it deletes the model' );
  });

  test('unloadTask', function(assert) {
    run(() => {
      this.task = this.service.send(this.store, this.model, 'unload');
    });

    assert.ok( this.store.unloadRecord.calledWith(this.model),
      'it unloads the model' );
  });

  test('rollbackTask', function(assert) {
    run(() => {
      this.task = this.service.send(this.store, this.model, 'rollback');
    });

    assert.ok( this.model.rollbackAttributes.calledOnce,
      'it rollbacks the model' );
  });

  test('findTask', function(assert) {
    run(() => {
      this.task = this.service.send(this.store, this.model, 'find');
    });

    assert.ok( this.store.findRecord.calledOnce,
      'it finds the model' );
  });
});


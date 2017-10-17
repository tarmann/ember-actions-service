import Ember from 'ember';

const { get, inject: { service } } = Ember;

export default Ember.Mixin.create({

  userActions: service(),

  actions: {
    userActions() {
      return get(this, 'userActions').send(...arguments);
    }
  }

});

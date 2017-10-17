import Ember from 'ember';

const { get, inject: { service } } = Ember;

export default Ember.Mixin.create({

  projectActions: service(),

  actions: {
    projectActions() {
      return get(this, 'projectActions').send(...arguments);
    }
  }

});

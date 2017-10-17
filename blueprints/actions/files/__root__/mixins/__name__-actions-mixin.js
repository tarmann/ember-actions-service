import Ember from 'ember';

const { get, inject: { service } } = Ember;

export default Ember.Mixin.create({

  <%= camelizedModuleName %>Actions: service(),

  actions: {
    <%= camelizedModuleName %>Actions() {
      return get(this, '<%= camelizedModuleName %>Actions').send(...arguments);
    }
  }

});

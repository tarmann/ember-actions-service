import Ember from 'ember';

const { get, inject: { service } } = Ember;

export default Ember.Mixin.create({

  store: service(),

  <%= camelizedModuleName %>Actions: service(),

  actions: {
    <%= camelizedModuleName %>Actions() {
      const store = get(this, 'store');
      return get(this, '<%= camelizedModuleName %>Actions').send(store, ...arguments);
    }
  }

});

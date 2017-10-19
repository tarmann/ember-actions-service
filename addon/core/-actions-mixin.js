import Ember from 'ember';

const { get, String: { camelize }, inject } = Ember;

export function actionsMixin(){

  // TODO: inject store if option is set
  // store: inject.service('store'),

  const mixin = { actions: {} };

  const args = (arguments.length === 1 ?
    [arguments[0]] :
    Array.apply(null, arguments));

  args.forEach(function(resource) {
    let resourceName = camelize(resource);

    mixin[`${resourceName}Actions`] = inject.service();

    mixin.actions[`${resourceName}Actions`] = function(){
      const store = get(this, 'store');
      return get(this, `${resourceName}Actions`).send(store, ...arguments);
    };
  })

  return Ember.Mixin.create(mixin);

}

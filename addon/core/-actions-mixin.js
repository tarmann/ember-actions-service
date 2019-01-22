import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { camelize } from '@ember/string';

export function actionsMixin(){

  // TODO: inject store if option is set
  // store: inject.service('store'),

  const mixin = { actions: {} };

  const args = (arguments.length === 1 ?
    [arguments[0]] :
    Array.apply(null, arguments));

  args.forEach(function(resource) {
    let resourceName = camelize(resource);

    mixin[`${resourceName}Actions`] = service();

    mixin.actions[`${resourceName}Actions`] = function(){
      const store = get(this, 'store');
      return get(this, `${resourceName}Actions`).send(store, ...arguments);
    };
  })

  return Mixin.create(mixin);

}

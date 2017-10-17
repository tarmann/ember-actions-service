import ActionsService from '../services/actions-service';
import { task } from 'ember-concurrency';

export default ActionsService.extend({

  resource: 'user',

  doSomethingTask: task(function * (store, callback, model){
    yield alert(`${model} do something`);
    return { callback, model };
  })

});


import ActionsService from '../services/actions-service';
// import { task } from 'ember-concurrency';

export default ActionsService.extend({

  resource: '<%= dasherizedModuleName %>',

  /**
   * Sample
   * @param {object} store Ember store service
   * @param {string} callback Callback name
   * @param {object} model Resource model
   */

  // sampleTask: task(function * (store, callback, model){
  //   yield model;
  //   return { callback, model };
  // })

});

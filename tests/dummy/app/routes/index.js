import Ember from 'ember';
import { actionsMixin } from 'ember-actions-service';

export default Ember.Route.extend(
  actionsMixin('user', 'project'), {

  actions: {
    doSomething(){
      alert('do something');
    }
  }

});

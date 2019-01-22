import Route from '@ember/routing/route';
import { actionsMixin } from 'ember-actions-service';

export default Route.extend(
  actionsMixin('user', 'project'), {

  actions: {
    doSomething(){
      alert('do something');
    }
  }

});

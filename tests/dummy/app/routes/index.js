import Ember from 'ember';
import UserActionsMixin from '../mixins/user-actions-mixin';
import ProjectActionsMixin from '../mixins/project-actions-mixin';

export default Ember.Route.extend(UserActionsMixin, ProjectActionsMixin, {

  actions: {
    doSomething(){
      alert('do something');
    }
  }

});

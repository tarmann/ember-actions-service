export function initialize(application) {
  application.inject('actions-service', 'store', 'service:store');
}

export default {
  name: 'actions-service',
  initialize
};

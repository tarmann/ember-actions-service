export function initialize(application) {
  application.inject('service:actions-service', 'store', 'service:store');
}

export default {
  name: 'actions-service',
  initialize
};

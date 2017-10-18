# ember-actions-service

This README outlines the details of collaborating on this Ember addon.

## Usage

```bash
ember g actions-service user
```

Route

```js
import Ember from 'ember';
import UserActionsMixin from '../mixins/user-actions-mixin';

export default Ember.Route.extend(UserActionsMixin, {
});
```

Template using route-actions

```hbs
{{#each users as |user|}}
  {{user-editor saveAction=(route-action "userActions" "save" user)}}
{{/each}}
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-actions-service`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

# ember-actions-service

This README outlines the details of collaborating on this Ember addon.

## Usage

Blueprint:

```bash
ember g actions-service user
```

Route

```js
import Ember from 'ember';
import UserActionsMixin from '../mixins/user-actions-mixin';
import { actionsMixin } from 'ember-actions-service';

export default Ember.Route.extend(actionsMixin('user'), {
});
```

Template using route-actions

```hbs
{{user-editor saveAction=(route-action "userActions" user "save")}}
```

## Actions

* findAll
* create
* save
* delete
* unload
* rollback

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

# ember-actions-service

Ember model, store and custom methods as an actions service.

[![Build Status](https://travis-ci.org/tarmann/ember-actions-service.svg)](https://travis-ci.org/tarmann/ember-actions-service)
[![Code Climate](https://codeclimate.com/github/tarmann/ember-actions-service/badges/gpa.svg)](https://codeclimate.com/github/tarmann/ember-actions-service)
[![Test Coverage](https://codeclimate.com/github/tarmann/ember-actions-service/badges/coverage.svg)](https://codeclimate.com/github/tarmann/ember-actions-service/coverage)
[![Ember Observer Score](https://emberobserver.com/badges/ember-actions-service.svg)](https://emberobserver.com/addons/ember-bundle-select)

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

---
outline: deep
---

## Installation
You can install this plugin via npm
```sh
npm install vue-nice-validate
```

## Usage
```vue
import Vue from 'vue';
import { ValidatePlugin } from 'vue-nice-validate';

Vue.use(ValidatePlugin);
```

### Basic Example
All you need is to add the v-validate directive to the input you wish to validate, 
Make sure your input has a id attribute through which denotes the exact path of the data to validate,
and optional name attribute for showing in error messages.

Then, pass to the directive a rules string which contains a list of validation rules separated by a pipe '|'. For the following example, the validation rules are straight forward. Use required to indicate that the field is required and email to indicate that the field must be an email. To combine both rules we assign the string value required|email to the v-validate expression value.

```vue
<input v-validate="'required|email'" id="email" name="email" type="text">
```

To display the error message we simply use the formErrors reactive property to display error generated for the field:
```vue
<span>{{ formErrors['email'] }}</span>
```
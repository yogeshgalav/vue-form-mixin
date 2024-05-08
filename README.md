<p align="center">
  <img width="250" src="http://vue-technologies.com/wp-content/uploads/2022/04/cropped-vue-logo-png.png">
  <br>
  <a href="https://npm.im/vue-nice-validate">
    <img src="https://badgen.net/npm/v/vue-nice-validate">
  </a>
  <a href="https://npm.im/vue-nice-validate">
    <img src="https://badgen.net/npm/dw/vue-nice-validate?color=blue">
  </a>
  <a href="https://bundlephobia.com/result?p=vue-nice-validate">
    <img src="https://badgen.net/bundlephobia/minzip/vue-nice-validate">
  </a>
</p>

# Vue Nice Validate
VueNiceValidate is a lightweight directive + data based validation package.  It is created for Vue3 with help of composable functions. This package allows developers to full fill their basic requirements for form validation without heavy templating, heavy computaion and much code. You can validate single input, multiple inputs, single form or third party component with ease. You can easily access and modify field errors, rules and messages. 

**Here are some usefull links**
1. [Documentation](https://vue-nice-validate.netlify.app/) 
2. [Demo](https://stackblitz.com/edit/vitejs-vite-fjbkrt?file=src%2FApp.vue)
3. [Discord](https://discord.com/channels/1193587847165378670/1193587848402714666)

This package is in early stage so feel free to make contribution and make this package better.
## Installation
The latest version supports Vue3, install it via npm
```
npm install vue-nice-validate
```
If you want to use it with Vue2, then you can use 
```
npm install vue-nice-validate@2
```

## Usage
### Basic Usage
The VueNiceValidate provide Vue3 composable function `useVueNiceValidate`
you have to run this function to get tools(Array and functions) to perform validation in your page.
For basic validation you need to import and use at least 4 entities,
`vValidate` for using directive
`validateForm` or `validateInputs` or `validateInput` to check if perticular input fields are valid w.r.t data.
`formErrors` for showing errors in template

## Import and use useVueNiceValidate
```js
import {useVueNiceValidate} from 'vue-nice-validate';
const {vValidate, formErrors, validateForm, validationFields} = useVueNiceValidate();
```

## Use as directive
You can add validation rules via `v-validate` directive for template usage
```js
const { vValidate } = useVueNiceValidate();

//options api
export default {
	...
	directives: {
		"validate": vValidate,
	}, 
	...
}
```

```html
<input id="email" :name="$t('email')" v-validate="'required|email'" />
```
The html element must contain id attribute. This id attribute must contain unique value which should reperesnt variable(reacive property) name. This package take rules from your directive in template and values from your reactive properties, And combine them with help of id attribute.
so for `let email = ref('')` you can use `<input id="email" />`
for `let loginForm = reactive({email:''})` you can use `<input id="loginForm.email" />`
for `let userProfile = reactive({emails:[{email:''}]})` you can use `<input id="userProfile.emails.0.email" />`

## use as Object
You can also add validation rules via function `addValidationFields` which accepts the following syntax
```js
const { addValidationFields } = useVueNiceValidate();

const validationFields = {
	'email': {
		'rules': 'required|email',
		'field_name': $t('email'),
		'form_name': '', //optional
		'validate_all_rules': false, //optional
	}
}

addValidationFields(validationFields);
```

## Check validation
```js
const { validateForm } = useVueNiceValidate();
...
	async submit(){
		let is_form_valid = await validateForm(loginForm); 
		if(!is_form_valid){
			//form is invalid
			return false;
		}
		//form is valid
		//call api
	}
...
```
validateForm is a promise which resolves with boolean result, it can be used just before calling api,
Or in 'onMounted' if you want to start validationg form and show errors on pageLoad
This functions will add respective field errors to formErrors reactive array.

## show Form Errors
### declare formErrors
```js
const { formErrors } = useVueNiceValidate();
//options api
export default {
	...
	data() {
		return {
			...
			formErrors: formErrors,
			...
		}
	}, 
	...
}
```

### use formErrors
```html
<input id="field_id" v-validate="'required'">
<span class="text-danger">{{ formErrors['field_id'] }}</span>
```

### Message Formatter
If you are using internationalization or wants your custom validation messages to show instead of default ones,
Then you can use messageFormatter option in ValidatePlugin
```js
import {ValidatePlugin} from 'vue-nice-validate';
...
const messageFormatter = (rule, params)=>{
	return i18n.global.t(rule.toUpperCase(), params)
};
app.use(ValidatePlugin,{messageFormatter});
...
```


### Validate selected input fields
To validate on selected input fields you can pass object containing only those fields.
```js
const { validateForm } = useVueNiceValidate();
...
	async submit(){
		//composition API
		let is_form_valid = await validateForm( ()=>({email,password}) ); 
		//optional API
		let is_form_valid = await validateForm( ()=>({email:this.email}) ); 
		if(!is_form_valid){
			//form is invalid
			return false;
		}
		//form is valid
		//call api
	}
...
```


### Validate multiple forms
To validate single form if you are using multiple forms in component, 
You need to pass form name as parameter in validateForm and formWatcher
You need to mention form name in template and with field ids as well
```html
<form>
	<input id="email" form="loginForm" v-validate="'required'"/>
	<span class="text-danger">{{ formErrors['loginForm#email'] }}</span>

	<input id="password"  v-validate:loginForm="'required'"/>
	<span class="text-danger">{{ formErrors['loginForm#password'] }}</span>
</form>
<form>
	<input id="email" form="registerForm" v-validate="'required'"/>
	<span class="text-danger">{{ formErrors['registerForm#email'] }}</span>

	<input id="password"  v-validate:registerForm="'required'"/>
	<span class="text-danger">{{ formErrors['registerForm#password'] }}</span>
</form>
```
```js
const { validateForm } = useVueNiceValidate();
...
	let loginForm = reactive({email,password});
	async login(){
		if(!await validateForm(loginForm, 'loginForm')){
			//loginForm is invalid
			return false;
		}
		...
	}
	let registerForm = reactive({email,password});
	async register(){
		if(!await validateForm(registerForm, 'registerForm')){
			//registerForm is invalid
			return false;
		}
		...
	}
...
```

### Manually Manage Errors
As formErrors is available as reactive property, you can play with it in case you want to add server error or custom errors.
```js
const { formErrors } = useVueNiceValidate();
...
formErrors['email'] = 'This email is already registered. Please Login.';
...
```

### Validate components with no id attribute
In most cases vue components pass id attribute or id props, this you can check by inspecting HTML elements in your browser
but if you have a component with no id atrribute then you can pass it via validate-id prop.
If both are not present you will get console error.


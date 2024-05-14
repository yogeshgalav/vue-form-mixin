---
outline: deep
---

# Error Messages
VueNiceValidate comes with generic error messages in english, which can be overwritten or internationalized according your requirement.

You can use ValidatePlugin and use messageFormatter option while initiallising your vue app.
```vue
import { ValidatePlugin } from 'vue-nice-validate';

const messageFormatter = (rule, params)=>{
	return i18n.global.t(rule.toUpperCase(), params)
};
app.use(ValidatePlugin,{messageFormatter})
...
app.mount('#app');
```
Here messageFormatter function will use your i18n key value pairs to show you all errors. This function has two parameters rule name (in smallcase) and object containing rule parameters. Assuming you have all i18n keys in uppercase you can use rule.toUpperCase().
Similiarly you can use your custom message formatter also.

## Message parameters
The message parameter provided as a second parameter in messageFormatter function is the object of following format.
```vue
{
	'fieldName':'',
	'param1':'',
	'param2':'',
	...
}
```
here param1, param2 etc are rule parameters. Depending upon rule there can be no parameters or any number.

If you are using i18n then your key value pair may look like:
```vue
'between'=>'The field with name {attribute} is not between {param1} and {param2}'
```

## Field-specific Custom Messages
if you want to show some custom message for selected fields, then you can use addValidationMessage function which accepts the following format:
```vue
addValidationMessage({
	'fieldId':{'required':'selectRequired'}
})
```
here 'fieldId' is id of the field, 'required' is the rule name and 'selectRequired' is the key from i18n.
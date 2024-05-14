---
outline: deep
---

# Custom Rules
You can easily add custom rules to VueNiceValidate, but your custom rules must have only two parameters with first parameter as value and it should return boolean value as a result.

## Adding a custom rule
You can add one or more validation rule with help of "addValidationRules" function which accepts object containing validationRules.
```vue
const { addValidationRules } = useVueNiceValidate();
function customRuleFn(...) { ... }
addValidationRules({customRuleFn})
```

## Custom rule with no parameter
If your custom rule doesn't require any parameter like "require" or if it use any external value or use other field value, then it will follow the given syntax
As mentioned earlier the first parameter should always be value to be validated.
```vue
function customRequire(value){
	return value ? true : false;
}
const my_time = ref('');
function hoursGreaterThen(value){
	return value > my_time.value;
}
function confirmPassword(value){
	return value === document.getElementById('confirmed').value;
}
addValidationRules({customRequire,hoursGreaterThen,confirmPassword})
```

usage:
```html
<input type="text" id="fieldId" v-validate="{'customRequire':true}">
<input type="text" id="fieldId2" v-validate="'hoursGreaterThen'">
<input type="text" id="fieldId3" v-validate="'confirmPassword'">
```

## Custom rule with one parameter
If your custom rule require only one parameter like max or min, then it will follow the given syntax:
```vue
function customMax(value, max){
	return value>max ? true : false;
}
addValidationRules({customMax})
```

usage:
```html
<input type="text" id="fieldId" v-validate="'customMax:255'">
<input type="text" id="fieldId2" v-validate="{'customMax': 255}">
```

## Custom rule with more then one parameter
If your custom rule require more then one parameter like between, then you need to pass all the rule parameter inside object as the second parameter and it will be used as param1, param2 .. and so on. it will follow the given syntax:
```vue
function customBetween(value, params){
	return params.param1 < value < params.param2;
}
addValidationRules({customBetween})
```

usage:
```html
<input type="text" id="fieldId" v-validate="'customBetween:5,10'">
<input type="text" id="fieldId2" v-validate="{'customBetween': [5,10]}">
<input type="text" id="fieldId2" v-validate="{'customBetween': {'param1':5,'param2':10}}">
```
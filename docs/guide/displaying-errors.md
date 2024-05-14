---
outline: deep
---

# Displaying Errors
After generating error messages, they are stored in an formErrors array which simplifies displaying errors in your UI.

You can import "formErrors" from useVueNiceValidate() composable function.
```vue
const { formErrors } = useVueNiceValidate();
```

## Displaying single error message
Typically you would want to display one error at a time for your fields, you can do this using formErrors['fieldId'] .
```html
<input type="text" id="fieldId" v-validate="'required'">
<span>{{ formErrors['fieldId'] }}</span>
```
> VueNiceValidate only generates one message per field by default as it uses a fast-exit strategy when running the validation pipeline. When the first failing rule is detected it will have its message generated and stored in the error bag instance, other rules results are then ignored. To disable this behavior you may want to configure the fastExit option in VueNiceValidate's config or use the continues modifier.

## Displaying Multiple error messages
Another use-case is that you might want to display all the errors for an input, typically to allow the user to fix multiple input errors at once. You have to use all modifier then formErrors['fieldId'] wil have array of error messages instead of single string for the specific field. If you don't use all modifier it will have string data type.

```html
<input type="text" id="fieldId" v-validate.all="'required|alpha|min:5'">
<ul>
  <li v-for="error in formErrors['fieldId']">{{ error }}</li>
</ul>
```

## Displaying all errors
Sometimes you need to display all fields errors on top of a form, especially for very large forms. In that case you can directly use validationFields property containing all fields data including "error_msgs". validationFields is array of field object that contain all errors with respect to that field in "error_msgs". You can use either:
```vue
const { validationFields } = useVueNiceValidate();
```

### Grouped by field
You can loop on validationFields array and show field respective errors just as it is.
```html
<input type="text" id="first" v-validate.all="'required|alpha|min:5'">

<input type="text" id="second" v-validate.all="'required|alpha|min:5'">

<ul>
  <li v-for="field in validationFields">
	<p>{{ field.field_name }}</p>
    <ul>
      <li v-for="error in Object.values(field.errors)">{{ error }}</li>
    </ul>
  </li>
</ul>
```

### Flat list of all errors
You can use merge error_msgs for all fields into a single flat array and use it as a computed property.
```html
<input type="text" id="first" v-validate="'required|alpha|min:5'">

<input type="text" id="second" v-validate.all="'required|alpha|min:5'">

<ul>
  <li v-for="field in validationFields">{{ error }}</li>
</ul>
```
```vue
const allErrors = computed(()=>
	validationFields.reduce((acc,el) => 
		acc.concat(Object.values(el.errors)),
	 [])
);
```
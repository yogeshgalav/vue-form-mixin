<template>
	<div class="min-h-screen items-center justify-center">
		<div class="container mx-auto my-6 grid">
			<ul class="flex justify-center space-x-2 text-white">
				<li>
					<button @click="currentTab('en')" class="border-b-2 focus:outline-none"
					:class="locale=='en' ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-500'"
					>English</button>
				</li>
				<li>
					<button @click="currentTab('ja')" class="border-b-2 focus:outline-none"
					:class="locale=='ja' ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-500'"
					>日本語</button>
				</li>
			</ul>
		</div>
		<div clas="grid grid-cols-3">
		<div class="bg-white p-8 rounded-lg shadow-md mx-auto">
			<h2 class="text-2xl font-semibold pb-6">{{ $t('SIGNUP') }}</h2>
			<form class=" text-left" @submit.prevent="onSubmit">
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="first_name">
							{{ $t('FIRST_NAME') }}
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							:class="formErrors['first_name'] ? 'border-red-500' : 'border-gray-200'"
							id="first_name" type="text" v-validate="'required'" v-model="data.first_name"
							:name="$t('FIRST_NAME')">
						<p class="text-red-500 text-xs italic">{{ formErrors['first_name'] }}</p>
					</div>
					<div class="w-full md:w-1/2 px-3">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="last_name">
							{{ $t('LAST_NAME') }}
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							:class="formErrors['last_name'] ? 'border-red-500' : 'border-gray-200'"
							id="last_name" type="text" v-validate="'required'" v-model="data.last_name"
							:name="$t('LAST_NAME')">
							<p class="text-red-500 text-xs italic">{{ formErrors['last_name'] }}</p>
					</div>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="email">
							{{ $t('EMAIL') }}
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							:class="formErrors['email'] ? 'border-red-500' : 'border-gray-200'"
							id="email" type="text" v-validate="'required|email'" v-model="data.email"
							:name="$t('EMAIL')">
						<p class="text-red-500 text-xs italic">{{ formErrors['email'] }}</p>
					</div>
					<div class="w-full md:w-1/2 px-3">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="phone_number">
							{{ $t('PHONE') }}
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							:class="formErrors['phone_number'] ? 'border-red-500' : 'border-gray-200'"
							id="phone.phone_number" type="text" v-validate="'required'" v-model="data.phone.phone_number"
							:name="$t('PHONE')">
							<p class="text-red-500 text-xs italic">{{ formErrors['phone.phone_number'] }}</p>
					</div>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="password">
							{{ $t('PASSWORD') }}
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							:class="formErrors['password'] ? 'border-red-500' : 'border-gray-200'"
							id="password" type="text" v-validate="'required|min:8'" v-model="data.password"
							:name="$t('PASSWORD')">
						<p class="text-red-500 text-xs italic">{{ formErrors['password'] }}</p>
					</div>
					<div class="w-full md:w-1/2 px-3">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="confirm_password">
							{{ $t('CONFIRM_PASSWORD') }}
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							:class="formErrors['confirm_password'] ? 'border-red-500' : 'border-gray-200'"
							id="confirm_password" type="text" v-validate="'required|confirmed:password'" v-model="data.confirm_password"
							:name="$t('CONFIRM_PASSWORD')">
							<p class="text-red-500 text-xs italic">{{ formErrors['confirm_password'] }}</p>
					</div>
				</div>
				
				<button type="submit"
					class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
					{{ $t('SIGNUP') }}</button>
			</form>
		</div>
		</div>
	</div>
</template>
<script setup>
import {useI18n} from 'vue-i18n';
const { locale } = useI18n();

import { reactive } from 'vue';
import { useVueNiceValidate } from 'vue-nice-validate';
const { vValidate, formErrors, validateForm, validationFields } = useVueNiceValidate();

let data = reactive({
	'first_name': '',
	'last_name': '',
	'email': '',
	'phone': {
		country_code:'',
		phone_number: ''
	},
	'password': '',
	'confirm_password': '',
});

function onSubmit() {
	validateForm(data).then(result => {
		console.log(validationFields);

		if (result) {
			console.log('Its valid');
		} else {
			console.log('Its not valid');
		}
	});
}

function currentTab(lang){
	locale.value = lang;
}
</script> 

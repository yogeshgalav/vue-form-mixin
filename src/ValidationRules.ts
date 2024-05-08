import { TValidationRules} from './types';

function getExtension(filename:string) {
	const parts = filename.split('.');
	return parts[parts.length - 1];
}
function getFieldValue(field_id:string){
	const field = document.getElementById(field_id);
	if (!field) {
		/* eslint-disable-next-line */
			console.error('Input field with id #' + field_id + ' not found.');
		return false;
	}
	return (field as HTMLInputElement).value;
}
const validationRules: TValidationRules = {
	required(value) {
		if (value && value.toString().trim()) return true;
		return false;
	},
	digits(value, max) {
		if (!isNaN(value)) return (value.toString().length === parseInt(max));
		return false;
	},
	digit_between(value, max) {
		if (!isNaN(value)) return value.toString().length <= max;
		return false;
	},
	max(value, max) {
		if (!isNaN(value)) return (value <= max);
		if (typeof value === 'string') return (value.length <= max);
		return false;
	},
	min(value, max) {
		if (!isNaN(value)) return (value >= max);
		if (typeof value === 'string') return (value.length >= max);
		return false;
	},
	email(value) {
		const is_email = String(value)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		return is_email ? true : false;
	},
	array(val) {
		return val instanceof Array;
	},

	url(url) {
		return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/i.test(url);
	},

	alpha(val) {
		return /^[a-zA-Z]+$/.test(val);
	},

	alpha_dash(val) {
		return /^[a-zA-Z0-9_-]+$/.test(val);
	},
	alpha_num(val) {
		return /^[a-zA-Z0-9]+$/.test(val);
	},
	accepted(val) {
		if (val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true) {
			return true;
		}

		return false;
	},
	regex(val, req) {
		const mod = /[g|i|m]{1,3}$/;
		let flag = req.match(mod);
		flag = flag ? flag[0] : '';

		req = req.replace(mod, '').slice(1, -1);
		req = new RegExp(req, flag);
		return !!req.test(val);
	},
	boolean(val) {
		return (
			val === true ||
			val === false ||
			val === 0 ||
			val === 1 ||
			val === '0' ||
			val === '1' ||
			val === 'true' ||
			val === 'false'
		);
	},
	numeric(val) {
		const num = Number(val); // tries to convert value to a number. useful if value is coming from form element

		if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
			return true;
		} else {
			return false;
		}
	},
	confirmed(val, confirmation_field) {
		const confirmed_value = getFieldValue(confirmation_field);

		if (confirmed_value === val) {
			return true;
		}

		return false;
	},
	integer(val) {
		return String(parseInt(val, 10)) === String(val);
	},
	filetype(filename, valid_extention) {
		const ext = getExtension(filename);
		if (valid_extention.split(',').includes(ext)) {
			return true;
		}
		return false;
	},
	image(filename) {
		const ext = getExtension(filename);
		switch (ext.toLowerCase()) {
		case 'jpg':
		case 'gif':
		case 'bmp':
		case 'png':
			//etc
			return true;
		}
		return false;
	},
	video(filename) {
		const ext = getExtension(filename);
		switch (ext.toLowerCase()) {
		case 'm4v':
		case 'avi':
		case 'mpg':
		case 'mp4':
			// etc
			return true;
		}
		return false;
	}
};

export default function useValidationRules(){
	
	function addValidationRules(ruleObject: TValidationRules): boolean {
		for (const key of Object.keys(ruleObject)){
			if(typeof ruleObject[key] !== 'function'){
			/* eslint-disable-next-line */
			console.error('Validation rule: '+key+' must be a function.');
				return false;
			}
			if(ruleObject[key].length>2){
				/* eslint-disable-next-line */
				console.error('Validation rule: '+key+' can have atmost 2 arguments.');
				return false;
			}
			validationRules[key] = ruleObject[key]; 
		}

		return true;
	}

	return {
		validationRules,
		addValidationRules
	}
}
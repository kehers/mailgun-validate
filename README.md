## mailgun-validate

Simple email validation for node.js using Mailgun's API. Performs

- Syntax checks (RFC defined grammar)
- DNS validation
- Spell checks
- Email Service Provider (ESP) specific local-part grammar (if available).

You will need to sign up at [https://mailgun.net](mailgun.net) for a public API key.

A PHP version is also available here: [https://github.com/kehers/MG_Email](github.com/kehers/MG_Email).

### Installation

```
npm install mailgun-validate
```

### Use

```javascript
var Validator = require('mailgun-validate');

var validator = new Validator('mail-gun-pub-key');
validator.validate('someemail@test.com', function(err, response) {
	if (err) {
		// Validation error
		// Log and fallback to regular expressions
		return;
	}

	/* response = {
	        "is_valid": true,
	        "address": "foo@mailgun.net",
	        "parts": {
	            "display_name": null,
	            "local_part": "foo",
	            "domain": "mailgun.net",
	        },
	        "did_you_mean": null
		}//*/

	if (response.is_valid) {
		// Email valid
	}
	else {
		// Email invalid
		if (response.did_you_mean) {
			// Did your mean response.did_you_mean?
		}
	}
})
```


### Licence

MIT
var https = require('https')
	;

var validator = function(pubKey) {
		this.pubKey = pubKey;
	}

validator.prototype.sendBack = function(err, msg, fn) {
	if (fn) {
		fn.call(this, err, msg);
	}
	else {
		console.log(err ? err : msg);
	}
}

validator.prototype.validate = function(email, fn) {

	// There should be a public key
	if (!this.pubKey) {
		this.sendBack('Provide your mailgun public key.', null, fn);
		return;
	}

	// There should be an email
	if (!email) {
		this.sendBack('Provide the email to validate.', null, fn);
		return;
	}

	var self = this;
	var options = {
		hostname: 'api.mailgun.net',
		path: '/v2/address/validate?address='+email+'&api_key='+this.pubKey,
		method: 'GET'
	};

	var req = https.request(options, function(res) {
		//console.log("statusCode: ", res.statusCode);

		var result = "";
		var status = res.statusCode;
		res.setEncoding('utf8');

		res.on('data', function(chunk) {
			result += chunk;
		});

		res.on('end', function(body) {
			if (status != 200) {
				self.sendBack('Unexpected response code '+status, null, fn);
			}
			else {
				var json = JSON.parse(result);
				if (json.message)
					self.sendBack(json.message, null, fn);
				else
					self.sendBack(null, json, fn);
			}
			//console.log(chunk);
		});
	});
	req.end();
	req.on('error', function(e) {
		//console.error(e);
		self.sendBack(e, null, fn);
	});
}

module.exports = validator;

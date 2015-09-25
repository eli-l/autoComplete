# jquery.autocomplete

A simple jQuery module to serve asynchronous request result.

#Usage:
$('input_wraper').ajaxSearch(settingsObject, callbackObject);

##Full list of object params:

settingsObject {
	timer : 300 (default)
	reqUrl: "",
	reqType: "GET" (default),
	respType: "JSON" (default),
	callback: [object]
}

callbackObject {
	success : '',
	error : ''
}

That means, callbacks can be defined within settings object, or as second callback parameters.
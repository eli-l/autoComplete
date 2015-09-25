# jquery.autocomplete

A simple jQuery module to serve asynchronous request result.

#Usage:
$('input_wraper').ajaxSearch(settingsObject, callbackObject);

##Full list of object params:

settingsObject { <br/>
	timer : 300 (default), <br/> 
	reqUrl: "", <br/>
	reqType: "GET" (default), <br/>
	respType: "JSON" (default), <br/>
	callback: [object] <br/>
} <br/>

callbackObject { <br/>
	success : '', <br/>
	error : '' <br/>
} <br/>
<br/>
It means, callbacks can be defined within settings object, or as second callback parameters.
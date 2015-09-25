# jquery.autocomplete

A simple jQuery module to serve asynchronous request result.

#Usage:
$('input_wraper').ajaxSearch(settingsObject, callbackObject);

##Full list of object params:
```
settingsObject { <br/>
	timer : 300 (default), <br/> 
	reqUrl: "", <br/>
	reqType: "GET" (default), <br/>
	respType: "JSON" (default), <br/>
	callback: [object] <br/>
}<br/>

callbackObject { <br/>
	success : '', <br/> 
	/* default function is getting results from request then apply it right after <input> as <li> elements within ul.search_result */
	error : '' <br/>
} <br/>
<br/>
```
*It means, callbacks can be defined within settings object, or as second callback parameters.*

**Feel free to comment, fork, pull etc.**
I will appreciate for your feedback.

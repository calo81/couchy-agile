/**
 * Created by .
 * User: cscarioni
 * Date: 13/03/11
 * Time: 17:26
 * To change this template use File | Settings | File Templates.
 */

Panel = function() {
}
Column = function() {
}
Chat = function() {
}

// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read'  : 'GET'
};
// Helper function to get a URL from a Model or Collection as a property
// or as a function.
var getUrl = function(object) {
    if (!(object && object.url)) throw new Error("A 'url' property or function must be specified");
    return _.isFunction(object.url) ? object.url() : object.url;
};

// Wrap an optional error callback with a fallback error event.
var wrapError = function(onError, model, options) {
    return function(resp) {
        if (onError) {
            onError(model, resp);
        } else {
            model.trigger('error', model, resp, options);
        }
    };
};
// Backbone.sync  Overriden toi support GET and PUT in Restful way GET /model/{id}, also including query string params for GET (just 1 right now)

function makeLongPollingCall(params,success) {
  return  $.PeriodicalUpdater(params.url, {
        method: 'get',          // method; get or post
        data: params.data,               // array of values to be passed to the page - e.g. {name: "John", greeting: "hello"}
        minTimeout: 1000,       // starting value for the timeout in milliseconds
        maxTimeout: 3000,       // maximum length of time between requests
        multiplier: 2,          // the amount to expand the timeout by if the response hasn't changed (up to maxTimeout)
        type: 'json',           // response type - text, xml, json, etc.  See $.ajax config options
        maxCalls: 0,            // maximum number of calls. 0 = no limit.
        autoStop: 0,             // automatically stop requests after this many returns of the same data. 0 = disabled.
        success: success
    });
}


Backbone.sync = function(method, model, success, error) {
    var type = methodMap[method];
    var modelJSON = (method === 'create' || method === 'update') ?
            JSON.stringify(model.toJSON()) : null;

    var queryAttribute = model.queryAttribute?model.queryAttribute():"";
    // Default JSON-request options.
    var params = {
        url:          getUrl(model),
        type:         type,
        contentType:  'application/json',
        data:         modelJSON,
        dataType:     'json',
        processData:  false,
        success:      success,
        error:        error,
        queryAttribute:  queryAttribute
    };

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
        params.contentType = 'application/x-www-form-urlencoded';
        params.processData = true;
        params.data = modelJSON ? {model : modelJSON} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
        if (type === 'PUT' || type === 'DELETE') {
            if (Backbone.emulateJSON) params.data._method = type;
            params.type = 'POST';
            params.beforeSend = function(xhr) {
                xhr.setRequestHeader("X-HTTP-Method-Override", type);
            };
        }
    }

    if ((type === 'GET' || type === 'PUT' || type === 'DELETE') && model.id) {
        params.url = params.url + "/" + model.id;
    }

    if (((type === 'GET' || type === 'DELETE') && params.queryAttribute!="")) {
        params.url = params.url + "?" + params.queryAttribute + "=" + model.get(params.queryAttribute);
    }
    // Make the request.
    if (type === 'GET' && model.longPollingGet) {
       var handler = makeLongPollingCall(params,success);
       model.asyncPollingHandler = handler;
    }
    else {
        $.ajax(params);
    }
};
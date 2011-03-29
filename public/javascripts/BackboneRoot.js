/**
 * Created by .
 * User: cscarioni
 * Date: 13/03/11
 * Time: 17:26
 * To change this template use File | Settings | File Templates.
 */

Panel=function(){}
Column=function(){}
Chat=function(){}

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

  Backbone.sync = function(method, model, success, error) {
    var type = methodMap[method];
    var modelJSON = (method === 'create' || method === 'update') ?
                    JSON.stringify(model.toJSON()) : null;

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
      queryAttribute:  model.queryAttribute()
    };

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.processData = true;
      params.data        = modelJSON ? {model : modelJSON} : {};
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

    if((type === 'GET' || type === 'PUT') && model.id){
        params.url=params.url+"/"+model.id;
    }

    if((type === 'GET' && params.queryAttribute)){
        params.url=params.url+"?"+params.queryAttribute+"="+model.get(params.queryAttribute);
    }
    // Make the request.
    $.ajax(params);
  };
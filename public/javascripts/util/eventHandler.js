EventHandler = {
    bindings:[],

    bind : function(object,event){
      this.bindings = this.bindings.concat({object:object,event:event});
    },

    trigger : function(event,options){
        var objetsToSendEvents = _.select(this.bindings, function(mapping){ return mapping.event == event; });
        _.each(objetsToSendEvents, function(binding){ binding.object[binding.event](options); });

    }
}

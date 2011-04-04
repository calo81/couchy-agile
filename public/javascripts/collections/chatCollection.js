Chat.Collection = Backbone.Collection.extend({

    model: Chat.Model,

    url:"/chat",

    setUserIdOnModel:function(models, resp) {
        models.each(function(model){
           model.set({user_id:window.user.get()});
        });
        return this;
    },

    fetch:function(options) {
        Backbone.Collection.prototype.fetch.call(this, {success:this.setUserIdOnModel});
    }

});

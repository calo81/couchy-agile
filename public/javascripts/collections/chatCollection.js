Chat.Collection = Backbone.Collection.extend({

    model: Chat.Model,

    url:"/chat",

    fetch:function(options) {
        var success = function(models, resp) {
            models.each(function(model) {
                model.set({user_id:window.user.get()});
            });
            if (options.success) {
                options.success(models, resp);
            }
            return this;
        };

        Backbone.Collection.prototype.fetch.call(this, {success:success});
    }

});

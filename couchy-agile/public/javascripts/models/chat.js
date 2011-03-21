Chat.Model = Backbone.Model.extend({
    join: function(userid){
        this.save({users:userid})
    }
});


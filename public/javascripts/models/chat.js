Chat.Model = Backbone.Model.extend({

    url:"/chat",

    join: function(userid){
        this.save({user_id:userid})
    },

    sendMessage:function(message){
        this.save({message:message});
    }
});


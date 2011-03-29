Chat.Model = Backbone.Model.extend({

    url:"/chat",

    queryAttribute:function(){
      return "user_id";
    },

    join: function(userid,success){
        this.save({user_id:userid},{success:success});
    },

    sendMessage:function(message){
        this.save({message:message});
    }
});


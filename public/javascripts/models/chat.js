Chat.Model = Backbone.Model.extend({

    url:"/chat",

    /**
     * Specify if the Get operation on the object will go to a Long polling using the jquery periodic updater
     */

    longPollingGet:true,

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


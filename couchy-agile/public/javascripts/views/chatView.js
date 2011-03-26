Chat.Template = {

    text:"<li id='lichat<%= chatId %>'><div class='chat-small-box'><" +
            "span id='chat<%= chatId %>'><%= chatName %></span><span>" +
            "<a class='a-no-borders joinaction' id='join<%= chatId %>' href='#'>" +
            "<img src='/images/join_button.gif' alt='join'/></a>" +
            "<a class='a-no-borders closechataction' id='close<%= chatId %>' href='#'>" +
            "<img src='/images/close_button.gif' alt='close'/></a>" +
            "</span></div></li>",

    compile:function(options){
        var compiled=_.template(this.text);
        return compiled(options);
    }
}

Chat.View = Backbone.View.extend({

    el: "#chat",

    template: Chat.Template,

    events: {
     "click .joinaction": "join",
     "click .closechataction": "close"
    },

    join:function(event){
        this.model.join(window.user.get());
    },

    close:function(event){
        if(this.model.isNew()){
          this.remove();
        }else{
           this.model.destroy();
           this.remove();
        }

    },

    render:function(elementToAppendTo){
        var contentToAppend=this.template.compile({chatName:this.model.get("name"),chatId:this.model.cid});
        $(elementToAppendTo).append(contentToAppend);
    },

    remove:function(){
        var chatid = "lichat"+this.model.cid;
        $("#"+chatid).remove();
        this.trigger("chat:remove",chatid);
    }
});

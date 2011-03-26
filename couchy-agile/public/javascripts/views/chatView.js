Chat.Template = {

    text:"<li><div class='chat-small-box'><span id='chat<%= chatId %>'><%= chatName %></span><span><a class='a-no-borders joinaction' id='join<%= chatId %>' href='#'><img src='/images/join_button.gif' alt='join'/></a></span></div></li>",

    compile:function(options){
        var compiled=_.template(this.text);
        return compiled(options);
    }
}

Chat.View = Backbone.View.extend({

    el: "#chat",

    template: Chat.Template,

    events: {
     "click .joinaction": "join"
    },

    join:function(event){
        this.model.join(window.user.get());
    },

    render:function(elementToAppendTo){
        var contentToAppend=this.template.compile({chatName:this.model.get("name"),chatId:this.model.cid});
        $(elementToAppendTo).append(contentToAppend);
    }
});

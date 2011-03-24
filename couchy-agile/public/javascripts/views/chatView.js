Chat.Template = {

    text:"<li><div id='chat<%= chatId %>'><%= chatName %><button id='join'>Join</button></div></li>",

    compile:function(options){
        var compiled=_.template(this.text);
        return compiled(options);
    }
}

Chat.View = Backbone.View.extend({

    el: "#chat",

    template: Chat.Template,

    events: {
     "click #join": "join"
    },

    join:function(){
        this.model.join(user);
    },

    render:function(elementToAppendTo){
        var contentToAppend=this.template.compile({chatName:this.model.get("name"),chatId:this.model.cid});
        $(elementToAppendTo).append(contentToAppend);
    }
});

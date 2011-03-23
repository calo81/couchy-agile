Chat.Template = {

    text:"<div id='chddat<%= chatId %>'><%= chatName %><button id='join' value='join'/></div>",

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
        var contentToAppend=this.template.compile({chatName:this.model.get("name"),chatId:this.model.get("id")});
        $(elementToAppendTo).html(contentToAppend);
        alert(contentToAppend);
    }
});

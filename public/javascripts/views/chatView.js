Chat.Template = {

    text:"<li id='lichat<%= chatId %>'><div class='chat-small-box'><" +
            "span id='chat<%= chatId %>'><%= chatName %></span><span>" +
            "<a class='a-no-borders joinaction' id='join<%= chatId %>' href='#'>" +
            "<img src='/images/join_button.gif' alt='join'/></a>" +
            "</span></div></li>",

    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}

Chat.View = Backbone.View.extend({

    el: "#chat",

    template: Chat.Template,

    join:function(event) {
        event.data.self.model.join(window.user.get(), event.data.self.openWindow);
    },

    render:function(elementToAppendTo) {
        var contentToAppend = this.template.compile({chatName:this.model.get("name"),chatId:this.model.cid});
        $(elementToAppendTo).append(contentToAppend);
    },

    remove:function() {
        var chatid = "lichat" + this.model.cid;
        $("#" + chatid).remove();
        EventHandler.trigger("chatRemoved", this.model.cid);
    },

    openWindow:function(model,response){
         EventHandler.trigger("onShowMainChat",model);
    },

    initEvents:function() {
        $("#join" + this.model.cid).live("click", {self:this}, this.join);
    },

    initialize: function() {
        this.initEvents();
    }
});

Chat.Template = {

    text:"<li id='lichat<%= chatId %>'><div class='chat-small-box'><" +
            "span id='chat<%= chatId %>'><%= chatName %></span><span>" +
            "<a class='a-no-borders joinaction' id='join<%= chatId %>' href='#'>" +
            "<img src='/images/join_button.gif' alt='join'/></a>" +
            "<a class='a-no-borders closechataction' id='close<%= chatId %>' href='#'>" +
            "<img src='/images/close_button.gif' alt='close'/></a>" +
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
        event.data.self.model.join(window.user.get());
        event.data.self.openWindow();
    },

    close:function(event) {
        if (event.data.self.model.isNew()) {
            event.data.self.remove();
        } else {
            event.data.self.model.destroy();
            event.data.self.remove();
        }

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

    openWindow:function(){
         EventHandler.trigger("onShowMainChat",this.model);
    },

    initEvents:function() {
        $("#close" + this.model.cid).live("click", {self:this}, this.close);
        $("#join" + this.model.cid).live("click", {self:this}, this.join);
    },

    initialize: function() {
        this.initEvents();
    }
});

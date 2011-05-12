MainChatViewTemplate = {
    text: "<div id='mainChatWindow'>" +
            "<h2><%= chatName %></h2>" +
            "<div>" +
            "<div id='chatBox'></div>" +
            "<div id='chatUsers'></div>" +
            "<input id='message' type='text'>" +
            "<button id='sendMessage'>Send</button>" +
            "</div>" +
            "</div>",

    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}

MainChatView = Backbone.View.extend({

    el:"#mainChatWindow",

    template:MainChatViewTemplate,

    render:function(appendTo) {
        var chatName = this.model.get("name");
        $(appendTo).html(this.template.compile({"chatName":chatName,"chatId":this.model.cid}));
        $("#mainChatWindow").dialog({modal:false,title:"Chat", width: 600 });
        $("#mainChatWindow").bind("dialogbeforeclose", {self:this}, this.close);

        this.startPolling();
    },

    close:function(event) {
        if (event.data.self.model.isNew()) {
            event.data.self.remove();
        } else {
            event.data.self.model.destroy();
            event.data.self.remove();
        }
        event.data.self.model.asyncPollingHandler.stop();
        EventHandler.trigger("onDeleteMainChat");
    },


    renderFromUpdate:function() {
        var messages = this.get("messages");
        var users = this.get("users");
        for (var i in messages) {
            $("#chatBox").append(messages[i] + "<br/>");
        }
        var usersString = "";
        for (var i in users) {
            usersString += users[i] + "<br/>";
        }
        $("#chatUsers").html(usersString);
    },

    startPolling:function() {
        this.model.fetch({user_id:window.user.get()});
    },

    sendMessage:function(event) {
        event.data.self.model.sendMessage($("#message").val());
        $("#message").val("");
    },

    sendMessageOnEnter:function(event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code == 13) {
           event.data.self.sendMessage(event);
        }
    },

    initEvents:function() {
        $("#sendMessage").live("click", {self:this}, this.sendMessage);
        $('#mainChatWindow input').live("keypress",{self:this}, this.sendMessageOnEnter);
        this.model.bind("change", this.renderFromUpdate);
    },

    initialize:function() {
        this.initEvents();
    }
})
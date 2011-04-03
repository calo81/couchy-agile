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
        $(appendTo).html(this.template.compile({"chatName":chatName}));
        this.startPolling();
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
    },

    sendMessageOnEnter:function(event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code == 13) {
           event.data.self.sendMessage(event);
        }
    },

    initEvents:function() {
        $("#mainChatWindow").liveDraggable();
        $("#sendMessage").live("click", {self:this}, this.sendMessage);
        $('#mainChatWindow input').live("keypress",{self:this}, this.sendMessageOnEnter);
        this.model.bind("change", this.renderFromUpdate);

    },

    initialize:function() {
        this.initEvents();
    }
})
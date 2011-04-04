ChatPanelTemplate = {

    text:"",
    tag: "<div id='chatPanel'>" +
            "<div id='chatCreation'>" +
            "<input type='text' id='newChatName' size='10'/>" +
            "<button id='newChat' class='button'>New Chat</button>" +
            "<ul id='chatUl'></ul>" +
            "</div>" +
            "<div id='mainChat'>" +
            "</div>" +
           "</div>",


    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}


var ChatPanel = Backbone.View.extend({

    el:"#chatPanel",

    template:ChatPanelTemplate,

    initEvents:function() {
        $("#newChat").live('click', {self:this}, this.createChat);
        EventHandler.bind(this, "chatRemoved");
        EventHandler.bind(this,"onShowMainChat");
    },

    chatViews:[],

    mainChatView:{},

    chatCollection:new Chat.Collection(),

    render: function(elementToAppendTo) {
        $(elementToAppendTo).html(this.template.tag);
        this.renderChildren();

    },
    chatRemoved: function(chatId) {
        this.chatViews = _.reject(this.chatViews, function(chatView) {
            return chatView.model.cid == chatId
        });
    },

    renderChildren:function() {
        $("#chatUl").html("");
        this.chatCollection.fetch();
        var self=this;
        this.chatCollection.each(function(model){
           var chatView = new Chat.View({model:model});
           self.chatViews = self.chatViews.concat(chatView);
        });
        this.chatViews.forEach(function(value, index, array) {
            value.render("#chatUl");
        });
    },

    addChat:function(chat) {
        var chatView = new Chat.View({model:chat});
        this.chatViews = this.chatViews.concat(chatView);
        this.renderChildren();
    },

    onShowMainChat:function(chat) {
        $("#mainChat").html("");
        this.mainChatView = new MainChatView({model:chat});
        this.mainChatView.render("#mainChat");
    },

    createChat: function(event) {
        var self = event.data.self;
        var chat = new Chat.Model({name:$("#newChatName").val()});
        self.addChat(chat);
    },

    initialize: function() {
        this.initEvents();
    }
})


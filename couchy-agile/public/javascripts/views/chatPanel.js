ChatPanelTemplate = {

    text:"",
    tag: "<div id='chatPanel'></div>",
    compile:function(options){
        var compiled=_.template(this.text);
        return compiled(options);
    }
}


var ChatPanel = Backbone.View.extend({

       el:"#chatPanel",

       template:ChatPanelTemplate,

       chatViews:[],

       render: function(elementToAppendTo){
           $(elementToAppendTo).html(this.template.tag);
           this.renderChildren();

       },

       renderChildren:function(){
         this.chatViews.forEach(function(value,index,array){value.render('#chatPanel');});
       },

       addChat:function(chat){
          var chatView = new Chat.View({model:chat});
          this.chatViews=this.chatViews.concat(chatView);

       },

       initialize: function() {
           this.createExampleChat = function () {
                var chat = new Chat.Model();
                chat.set({id:"chat-1"});
                chat.set({name:"chat-1"});
                this.addChat(chat);
           };
           this.createExampleChat();

       }
})


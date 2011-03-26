ChatPanelTemplate = {

    text:"",
    tag: "<div id='chatPanel'><input type='text' id='newChatName' size='10'/><button id='newChat' class='button'>New Chat</button><ul id='chatUl'></ul></div>",
    compile:function(options){
        var compiled=_.template(this.text);
        return compiled(options);
    }
}


var ChatPanel = Backbone.View.extend({

       el:"#chatPanel",

       template:ChatPanelTemplate,

       initEvents:function(){
            $("#newChat").live('click',{self:this},this.createChat);
            this.bind("chat:remove",this.chatRemoved);
        },

       chatViews:[],

       render: function(elementToAppendTo){
           $(elementToAppendTo).html(this.template.tag);
           this.renderChildren();

       },
       chatRemoved: function(chatid){
         alert("removed");
       },

       renderChildren:function(){
         $("#chatUl").html("");
         this.chatViews.forEach(function(value,index,array){value.render("#chatUl");});
       },

       addChat:function(chat){
          var chatView = new Chat.View({model:chat});
          this.chatViews=this.chatViews.concat(chatView);
          this.renderChildren();
       },

       createChat: function(event){
           var self = event.data.self;
           var chat = new Chat.Model({name:$("#newChatName").val()});
           self.addChat(chat);
       },

       initialize: function() {
             this.initEvents();
       }
})


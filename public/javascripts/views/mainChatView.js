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

   compile:function(options){
        var compiled=_.template(this.text);
        return compiled(options);
    }
}

MainChatView = Backbone.View.extend({

       el:"#mainChatWindow",

       template:MainChatViewTemplate,

       render:function(appendTo){
         $(appendTo).html(this.template.compile({chatName:this.model.get("name")}));
       },

       sendMessage:function(event){
          event.data.self.model.sendMessage($("#message").val());
       },

       initEvents:function(){
          $( "#mainChatWindow" ).liveDraggable();
          $("#sendMessage").live("click",{self:this},this.sendMessage);
       },

       initialize:function(){
           this.initEvents();
       }
})
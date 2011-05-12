SmallCardTemplate = {
    text : "<li id='<%=card.get('title')%>'><div id='notes'>" +
            "<div>      " +
            "<p><%=card.get('title')%></p>  " +
            "</div> " +
            "</div></li>",

    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}

SmallCard = Backbone.View.extend({
    template:SmallCardTemplate,
    renderStringForColumn:function(column) {
        if (this.model.get('status') == "column"+column) {
            return this.template.compile({card:this.model});
        }
    },

    cardAddedToColumn:function(options){
       if(options.cardId==this.model.get('title')){
           this.model.save({status:options.column});
       }
    },

    initEvents:function(){
       EventHandler.bind(this,"cardAddedToColumn");
    },

    initialize:function(){
        this.initEvents();
    }
})
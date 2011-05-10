SmallCardTemplate = {
    text : "<ul id='notes'>" +
            "<li>      " +
            "<p><%=card.get('title')%></p>  " +
            "</li> " +
            "</ul>",

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
    initEvents:function(){
         $("#notes").liveDraggable();
    },

    initialize:function(){
        this.initEvents();
    }
})
SmallCardTemplate = {
    text : "<li><div id='notes'>" +
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
    initEvents:function(){
         //$("#notes").liveDraggable({ connectToSortable: '.column' });
    },

    initialize:function(){
        this.initEvents();
    }
})
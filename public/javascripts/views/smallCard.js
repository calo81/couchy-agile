SmallCardTemplate = {
    text : "<ul id='notes'>"+
        "<li>      "+
            "<p><%=card.title%></p>  "+
        "</li> "+
    "</ul>",

    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}

SmallCard = Backbone.View.extend({
    template:SmallCardTemplate,
    renderString:function() {
        return this.template.compile({card:this.model});
    }
})
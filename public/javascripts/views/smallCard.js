SmallCardTemplate = {
    text : "<ul id='notes'>"+
        "<li>      "+
            "<p>Push new feature to Kiln for code review</p>  "+
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
        return this.template.text;
    }
})
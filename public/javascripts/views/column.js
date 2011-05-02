ColumnViewTemplate = {
    text : "<div class='column' id='column<%=title%>'><h2><%=title%></h2></div>",

    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}

ColumnView = Backbone.View.extend({
    el: "#panel",
    template: ColumnViewTemplate,
    title:"",

    renderFromPanel:function(){
        return this.template.compile({title:this.title});
    },
    addTask:function(){

    },

    initEvents:function(){
        $("#column"+this.title).contextMenu("columnContextMenu"+this.title,{
            'Add Task': {
                click: this.addTask
            }
        });

    },

    initialize: function(title) {
        this.title=title;
    }
})
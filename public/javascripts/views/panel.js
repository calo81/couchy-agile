Panel.Template = {
    text : "<div class='panel' id='cardPanel'>" +
            "</div>"  ,

    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}

Panel.View = Backbone.View.extend({
    el: "#panel",
    template:Panel.Template,
    startedColumn: ColumnView,
    nonStartedColumn:ColumnView,
    doneColumn:ColumnView,
    inTestColumn:ColumnView,

    render: function(elementToAppendTo) {
      $(elementToAppendTo).html(this.template.compile());
      this.nonStartedColumn.renderFromPanel();
      this.startedColumn.renderFromPanel();
      this.doneColumn.renderFromPanel();
     },

     initialize: function() {
          this.startedColumn = new ColumnView("Started");
          this.nonStartedColumn = new ColumnView("New");
          this.doneColumn = new ColumnView("Done");
          EventHandler.bind(this,"taskAdded")
    },

    taskAdded:function(args){
        this.render(this.el);
    }

})


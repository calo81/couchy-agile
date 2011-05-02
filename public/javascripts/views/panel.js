Panel.Template = {
    text : "<div class='panel'>" +
            "<%= nonStartedColumn.renderFromPanel() %>"+
            "<%= startedColumn.renderFromPanel() %>"+
            "<%= inTestColumn.renderFromPanel() %>"+
            "<%= doneColumn.renderFromPanel() %>" +
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
      $(elementToAppendTo).html(this.template.compile({nonStartedColumn:this.nonStartedColumn,startedColumn:this.startedColumn,doneColumn:this.doneColumn,inTestColumn:this.inTestColumn}));
      this.nonStartedColumn.initEvents();
      this.startedColumn.initEvents();
      this.doneColumn.initEvents();
      this.inTestColumn.initEvents();
     },

     initialize: function() {
          this.startedColumn = new ColumnView("Started")
          this.nonStartedColumn = new ColumnView("New")
          this.doneColumn = new ColumnView("Done")
          this.inTestColumn = new ColumnView("Test")
    }

})


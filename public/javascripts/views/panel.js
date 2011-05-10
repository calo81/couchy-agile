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
      this.inTestColumn.renderFromPanel();

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


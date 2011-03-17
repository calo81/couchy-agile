Panel.Template = {
    value : "<div><% startedColumn.render() %></div>"
}

Panel.View = Backbone.View.extend({
    el: "#panel",
    startedColumn: Column.View,
    nonStartedColumn:Column.View,
    doneColumn:Column.View,
    inTestColumn:Column.View,

    render: function() {
      // $(this.el).html(_.template(Panel.Template.value));
       return this;
     },

     initialize: function() {
          this.startedColumn = new Column.View
    }

})


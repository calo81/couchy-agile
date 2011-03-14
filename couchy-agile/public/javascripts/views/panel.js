Panel.Template = {
    value : "<div><% startedColumn.render() %></div>"
}

Panel.View = Backbone.View.extend({
    el: "#panel",
    startedColumn: Panel.Column,
    nonStartedColumn:Panel.Column,
    doneColumn:Panel.Column,
    inTestColumn:Panel.Column,

    render: function() {
       $(this.el).html(_.template(Panel.Template.value));
       return this;
     },

     initialize: function() {
          this.startedColumn = new Panel.Column
    }

})


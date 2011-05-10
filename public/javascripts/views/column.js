ColumnViewTemplate = {
    text : "<div class='column' id='column<%=title%>'><h2><%=title%></h2>" +
            "<div id='cards<%=title%>'>" +
            "<%" +
            "cards.forEach(function(card){" +
            "var cardView = new SmallCard({model:card});" +
            "%><%=cardView.renderStringForColumn(title)%><%" +
            "}); %></div></div>",

    compile:function(options) {
        var compiled = _.template(this.text);
        return compiled(options);
    }
}

ColumnView = Backbone.View.extend({
    el: "#panel",
    template: ColumnViewTemplate,
    title:"",
    panelId:"cardPanel",

    renderWithReturnedCards:function(collection, response) {
        var columnHtml = collection.column.template.compile({title:collection.column.title,cards:collection.column.cards});
        $("#" + collection.column.panelId).append(columnHtml);
        collection.column.initEvents();
    },

    renderEmpty:function(collection, response){
       var columnHtml = collection.column.template.compile({title:collection.column.title,cards:[]});
        $("#" + collection.column.panelId).append(columnHtml);
        collection.column.initEvents();
    },

    renderFromPanel
            :
            function() {
                this.cards.fetch({success:this.renderWithReturnedCards,error:this.renderEmpty});
            }
    ,
    addTask:function(element) {
        var card = new Card({model:new Task()});
        card.renderForEdit(element[0].id);
    }
    ,

    initEvents:function() {
        $("#column" + this.title).contextMenu("columnContextMenu" + this.title, {
            'Add Task': {
                click: this.addTask
            }
        });

    }
    ,

    initialize: function(title) {
        this.title = title;
        this.cards=new CardCollection();
        this.cards.column=this;
    }
})
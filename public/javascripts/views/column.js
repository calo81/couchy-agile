ColumnViewTemplate = {
    text : "<div class='column' id='column<%=title%>'><h2><%=title%></h2>" +
            "<div id='cards<%=title%>'>" +
            "<%" +
            "cards.forEach(function(card){" +
            "var cardView = new SmallCard({model:card});" +
            "%><%=cardView.renderString()%><%" +
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
    cards: new CardCollection,
    panelId:"cardPanel",

    renderWithReturnedCards:function(collection, response) {
        EventHandler.trigger("retrievedCardsEvent", {});
    },

    retrievedCardsEvent:function() {
        var columnHtml = this.template.compile({title:this.title,cards:this.cards});
        $("#" + this.panelId).append(columnHtml);
    },

    renderFromPanel:function() {
        this.cards.fetch({success:this.renderWithReturnedCards});
    },
    addTask:function(element) {
        var card = new Card({model:new Task()});
        card.renderForEdit(element[0].id);
    },

    initEvents:function() {
        $("#column" + this.title).contextMenu("columnContextMenu" + this.title, {
            'Add Task': {
                click: this.addTask
            }
        });

    },

    initInitialEvents:function() {
        EventHandler.bind(this, "retrievedCardsEvent");
    },

    initialize: function(title) {
        this.title = title;
        this.initInitialEvents();
    }
})
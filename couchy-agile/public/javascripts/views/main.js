/**
 * Created by .
 * User: cscarioni
 * Date: 13/03/11
 * Time: 16:24
 * To change this template use File | Settings | File Templates.
 */

window.MainView = Backbone.View.extend({
    el: $("#main"),

    panelView:Panel.View,

    refreshViewWhenTabSelected:function(event,ui){
        alert("tabchanged");
    },
    initialize: function() {
      $("#main").tabs({
            select: function(event,ui){
                  window.Main.refreshViewWhenTabSelected(event,ui);
            }
        });
    }

})

$(function() {
		window.Main = new MainView;
});



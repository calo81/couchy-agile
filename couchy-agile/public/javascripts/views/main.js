/**
 * Created by .
 * User: cscarioni
 * Date: 13/03/11
 * Time: 16:24
 * To change this template use File | Settings | File Templates.
 */

window.MainView = Backbone.View.extend({
    el: "#main",

    panelView:Panel.View,

    chatPanelView:new ChatPanel,

    currentTab:{},

    currentView:{},

    refreshViewWhenTabSelected:function(event,ui){
        this.currentTab = ui.panel;
        if(ui.index==0){
            this.currentView=this.panelView;
        }
        else if(ui.index==5){
            this.currentView=this.chatPanelView;
        }
        this.render();
    },

    render:function(){
       this.currentView.render(this.currentTab);
    },

    initialize: function() {
        this.panelView=new Panel.View;
        $(this.el).tabs({
            select: function(event,ui){
                  window.Main.refreshViewWhenTabSelected(event,ui);
            }
        });
    }

})

$(function() {
		window.Main = new MainView;
});



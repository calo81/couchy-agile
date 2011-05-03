/**
 * Created by .
 * User: cscarioni
 * Date: 13/03/11
 * Time: 16:24
 * To change this template use File | Settings | File Templates.
 */

window.MainView = Backbone.View.extend({
    el: "#main",

    panelView:{},

    chatPanelView:{},

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
        else{
          this.currentView={
              render : function(){
              $(".panel").html("");
           }
          }
        }
        this.render();
    },

    render:function(){
       this.currentView.render(this.currentTab);
    },

    initialize: function() {
        this.panelView=new Panel.View;
        this.chatPanelView = new ChatPanel;
        this.currentView=this.panelView;
        this.currentTab="#panel";
        $(this.el).tabs({
            select: function(event,ui){
                  window.Main.refreshViewWhenTabSelected(event,ui);
            }
        });
        this.render();
    }

})

$(function() {
		window.Main = new MainView;
});



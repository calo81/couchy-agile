describe("MainChatView", function() {
    var chat;
    var chatView;
    var event;

    beforeEach(function() {
        chat = new Chat.Model();
        chat.asyncPollingHandler={
            stop:function(){

            }
        }
        chatView = new MainChatView({model:chat});
        event = {
            data:{self:chatView}
        };


    });
    it("When delete chat and no id just remove chat from view", function() {
        spyOn(chat, "destroy");
        spyOn(chat.asyncPollingHandler, "stop");
        spyOn(chatView, "remove");
        spyOn(EventHandler, "trigger");
        chatView.close(event)
        expect(chat.destroy).not.toHaveBeenCalled();
        expect(chat.asyncPollingHandler.stop).toHaveBeenCalled();
        expect(chatView.remove).toHaveBeenCalled();
        expect(EventHandler.trigger).toHaveBeenCalled();
    });

    it("When delete chat and with id  remove chat from view and server", function() {
        spyOn(chat, "destroy");
        spyOn(chat.asyncPollingHandler, "stop");
        spyOn(chatView, "remove");
        spyOn(EventHandler, "trigger");
        chat.set({id:"xx"});
        chatView.close(event);
        expect(chat.destroy).toHaveBeenCalled();
        expect(chatView.remove).toHaveBeenCalled();
        expect(chat.asyncPollingHandler.stop).toHaveBeenCalled();
        expect(EventHandler.trigger).toHaveBeenCalled();
    });
});

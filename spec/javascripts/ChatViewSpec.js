describe("ChatView", function() {
  var chat;
  var chatView;
  var event;

  beforeEach(function() {
    chat = new Chat.Model();
    chatView = new Chat.View({model:chat});
    event={
        data:{self:chatView}
    };

  });

  it("When join event received call join on chat", function() {
    spyOn(chat,"join");
    spyOn(chatView,"openWindow");
    chatView.join(event)
    expect(chat.join).toHaveBeenCalled();
    expect(chatView.openWindow).toHaveBeenCalled();
  });

  it("When delete chat and no id just remove chat from view", function() {
    spyOn(chat,"destroy");
    spyOn(chatView,"remove");
    chatView.close(event)
    expect(chat.destroy).not.toHaveBeenCalled();
    expect(chatView.remove).toHaveBeenCalled();
  });

    it("When delete chat and with id  remove chat from view and server", function() {
      spyOn(chat,"destroy");
      spyOn(chatView,"remove");
      chat.set({id:"xx"});
      chatView.close(event)
      expect(chat.destroy).toHaveBeenCalled();
      expect(chatView.remove).toHaveBeenCalled();
    });


});

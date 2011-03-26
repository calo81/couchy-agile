describe("ChatView", function() {
  var chat;
  var chatView;

  beforeEach(function() {
    chat = new Chat.Model();
    chatView = new Chat.View({model:chat});
  });

  it("When join event received call join on chat", function() {
    spyOn(chat,"join");
    chatView.join()
    expect(chat.join).toHaveBeenCalled();
  });

  it("When delete chat and no id just remove chat from view", function() {
    spyOn(chat,"destroy");
    spyOn(chatView,"remove");
    chatView.close()
    expect(chat.destroy).not.toHaveBeenCalled();
    expect(chatView.remove).toHaveBeenCalled();
  });

    it("When delete chat and with id  remove chat from view and server", function() {
      spyOn(chat,"destroy");
      spyOn(chatView,"remove");
      chat.set({id:"xx"});
      chatView.close()
      expect(chat.destroy).toHaveBeenCalled();
      expect(chatView.remove).toHaveBeenCalled();
    });


});
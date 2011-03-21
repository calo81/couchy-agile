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
    expect(chat.join).toHaveBeenCalledWith("user-1");
  });
});
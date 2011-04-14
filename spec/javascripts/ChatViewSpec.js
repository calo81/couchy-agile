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
  });

});

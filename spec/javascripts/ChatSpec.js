describe("Chat", function() {
  var chat;

  beforeEach(function() {
    chat = new Chat.Model();
    chat.set({id:"chat-1"})
  });

  it("can be joined by user and joins on server", function() {
    spyOn(chat,"save");
    chat.join("user-1");
    expect(chat.save).toHaveBeenCalledWith({user_id:"user-1"},{})
  });
});
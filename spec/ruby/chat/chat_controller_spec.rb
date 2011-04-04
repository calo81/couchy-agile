require 'spec_helper'
describe ChatController do
  it "must recibe get petitions for getting messages for a particular chat and derive it to user" do
    chat_controller = ChatController.new
    chat_controller.params={:id=>"chat-1", :user_id =>"user-1"}
    user_mock = mock("user_mock")
    chat_mock = mock("chat_mock")
    User.should_receive(:find).with("user-1").and_return(user_mock)
    Chat.should_receive(:find).with("chat-1").and_return(chat_mock)
    chat_mock.should_receive(:users).and_return([User.new("user-1")])
    user_mock.should_receive(:get_mesages_for_chat).and_return({"user-2"=>"message-1", "user-3"=>"message xxx"})
    chat_controller.should_receive(:render)
    json_returned = chat_controller.show
  end

  it "must recibe chat messages from users and send them to the corresponding chat" do
    chat_controller = ChatController.new
    chat_controller.params={:id=>"chat-1", :user_id =>"user-1", :message=>"El mensaje enviado al chat"}
    chat_mock = mock("chat_mock")
    Chat.should_receive(:find).with("chat-1").and_return(chat_mock)
    User.should_receive(:find).with("user-1").and_return("user-1")
    chat_mock.should_receive(:send_message).with("user-1", "El mensaje enviado al chat")
    chat_mock.should_receive(:users).and_return([User.new("user-1"),User.new("user-2")])
    chat_controller.should_receive(:render)
    chat_controller.update
  end

  it "when getting a creation request, puts the name as the id" do
    chat_controller = ChatController.new
    chat_controller.params={:name=>"chat-1", :user_id =>"user-1"}
    chat_mock = mock("chat_mock")
    Chat.should_receive(:join).with(an_instance_of(User), "chat-1").and_return(chat_mock)
    chat_mock.should_receive(:users).and_return([User.new("user-1"),User.new("user-2")])
    chat_controller.should_receive(:render)
    chat_controller.create
  end

  it "will just return on delete without id" do
    chat_controller = ChatController.new
    chat_controller.params={}
    chat_controller.should_receive(:render).with({:json=>{}})
    chat_controller.destroy
  end

  it "will delete the full chat when no user_id provided" do
    chat_controller = ChatController.new
    chat = Chat.new("chat-1")
    chat_controller.params={:id => "chat-1"}
    Chat.should_receive(:find).with("chat-1").and_return(chat)
    chat.should_receive(:delete)
    chat_controller.should_receive(:render).with({:json=>{}})
    chat_controller.destroy
  end

   it "will delete the user from the chat and the chat from the user when id and user id arrives" do
    chat_controller = ChatController.new
    chat = Chat.new("chat-1")
    chat_controller.params={:id => "chat-1",:user_id => "user-1"}
    Chat.should_receive(:find).with("chat-1").and_return(chat)
    chat.should_receive(:leave).with("user-1")
    chat_controller.should_receive(:render)
    chat_controller.destroy
   end

  it "will return all chats when called with a GET without id the index executes" do
    chat_controller = ChatController.new
    Chat.should_receive(:all).and_return([])
    chat_controller.should_receive(:render)
    chat_controller.index
  end

end
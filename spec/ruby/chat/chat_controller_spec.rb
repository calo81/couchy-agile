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
    chat_mock.should_receive(:send_message).with("user-1","El mensaje enviado al chat")
    chat_mock.should_receive(:to_json).and_return({"id"=>"xx"})
    chat_controller.should_receive(:render).with({:json=>{"id"=>"xx"}})
    chat_controller.update
  end

  it "when getting a creation request, puts the name as the id" do
    chat_controller = ChatController.new
    chat_controller.params={:name=>"chat-1", :user_id =>"user-1"}
    chat_mock = mock("chat_mock")
    Chat.should_receive(:join).with(an_instance_of(User),"chat-1").and_return(chat_mock)
    chat_mock.should_receive(:to_json).and_return({"id"=>"xx"})
    chat_controller.should_receive(:render).with({:json=>{"id"=>"xx"}})
    chat_controller.create
  end

  it "will return all json chats when index called" do
     chat_controller = ChatController.new
     chat1=Chat.new("chat-1")
     chat2=Chat.new("chat-2")
     chat_controller.index
  end

    it "will just return on delete without id" do
     chat_controller = ChatController.new
     chat_controller.should_receive(:render).with({:json=>{}})
     chat_controller.destroy
    end

end
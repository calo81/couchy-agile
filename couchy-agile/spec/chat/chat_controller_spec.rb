require 'spec_helper'
describe ChatController do
  it "must recibe get petitions for getting messages for a particular chat and derive it to user" do
    chat_controller = ChatController.new
    chat_controller.params={:id=>"chat-1", :user_id =>"user-1"}
    user_mock = mock("user_mock")
    User.should_receive(:find).with("user-1").and_return(user_mock)
    user_mock.should_receive(:get_mesages_for_chat).and_return({"user-2"=>"message-1", "user-3"=>"message xxx"})
    json_returned = chat_controller.show
    json_returned.include?("user-2").should be_true
    json_returned.include?("message xxx").should be_true
  end

  it "must recibe chat messages from users and send them to the corresponding chat" do
    chat_controller = ChatController.new
    chat_controller.params={:id=>"chat-1", :user_id =>"user-1", :message=>"El mensaje enviado al chat"}
    chat_mock = mock("chat_mock")
    Chat.should_receive(:find).with("chat-1").and_return(chat_mock)
    chat_mock.should_receive(:send_message).with("user-1","El mensaje enviado al chat")
    chat_controller.update
  end
end
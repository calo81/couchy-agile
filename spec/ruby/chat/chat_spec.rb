require 'spec_helper'
describe Chat do
  it "gets created when joining unexistent and returns the chat" do
    chat = Chat.join("user-identifier", "chat 1")
    Chat.exists?("chat 1").should be_true
    chat.should be_a Chat
  end

  it "If joining existent no new is created" do
    chat = Chat.join("user-identifier", "chat 1")
    chat2 = Chat.join("user-2", "chat 1")
    chat.should be chat2
  end

  it "can be joined on existent instances" do
    chat=Chat.new("new chat")
    chat.join("user-2-id")
    Chat.exists?("new chat").should be_true
  end

  it "contains all the user id that join it" do
    chat=Chat.new("new chat")
    chat.join("user-1-id")
    chat.join("user-2-id")
    chat.users.include?("user-1-id").should be_true
    chat.users.include?("user-2-id").should be_true
  end


  it "receive messages from users and notify the other users" do
    chat=Chat.new("new chat")
    $mensaje1="this message shouldn't change"
    $mensaje2="this message should change"
    user=User.new("user-1-id")

    def user.receive_chat_message_notification(chatid, message, sender)
      $mensaje1=message
    end

    user2=User.new("user-2-id")

    def user2.receive_chat_message_notification(chatid, message, sender)
      $mensaje2=message
    end

    chat.join(user)
    chat.join(user2)
    chat.send_message("user-1-id", "El mensaje")
    $mensaje1.should == "this message shouldn't change"
    $mensaje2.should == "El mensaje"
  end

  it "gets deleted from the array of chats when deleted" do
    chat=Chat.new("new chat")
    chat2=Chat.new("chat-2")
    Chat.find("chat-2").should be_true
    chat2.delete
    Chat.find("chat-2").should be_false
  end

  it "allows a user to leave it, by user or user_id" do
    chat=Chat.new("new chat")
    user=User.new("user-1")
    chat.join(user)
    chat.users.size.should == 1
    chat.leave(user)
    chat.users.size.should == 0
  end

end
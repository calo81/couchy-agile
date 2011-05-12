require 'spec_helper'
describe User do
  it "returns the chat messages when there are any" do
    user=User.new("user-1")
    sender=User.new("sender")
    user.receive_chat_message_notification("chat-1", "message 1",sender)
    user.receive_chat_message_notification("chat-1", "message 2",sender)
    messages = user.get_mesages_for_chat("chat-1")
    messages.empty?.should be_false
    messages.include?("sender:message 1").should be_true
    messages.include?("sender:message 2").should be_true
  end

  it "must unblock on message arriving" do
    user=User.new("user-1")
    sender=User.new("sender")
    t1=Thread.new {
      user.get_mesages_for_chat("chat-1")
    }
    t1.alive?.should be_true
    user.receive_chat_message_notification("chat-1", "message 2",sender)
    sleep(2)
    t1.alive?.should be_false
  end


  it "When creating one user I should be able to find it" do
    user=User.new("user-1")
    user_found=User.find("user-1")
    user.should be user_found
  end

end
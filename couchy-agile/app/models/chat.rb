class Chat

  @@chats={}

  def self.join(user, chatid)
    chat = @@chats[chatid] || @@chats[chatid]=Chat.new(chatid)
    chat.join(user)
    chat
  end

  def self.exists?(chatid)
    return @@chats.has_key?(chatid)
  end

  attr_reader :users

  def initialize(chatid)
    @@chats[chatid]=self
    @users=Set.new
  end

  def join(user)
    @users << user
  end

  def send_message(userid, message)
    @users.each { |user|
      user.receive_chat_message(message) unless user.id==userid
    }
  end
end
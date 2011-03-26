class Chat
  include ActiveModel::Serializers::JSON
  @@chats={}

  def self.join(user, chatid)
    chat = @@chats[chatid] || @@chats[chatid]=Chat.new(chatid)
    chat.join(user)
    chat
  end

  def self.exists?(chatid)
    return @@chats.has_key?(chatid)
  end

  def self.find(chatid)
    return @@chats[chatid]
  end

  def self.all
    @@chats
  end

  attr_reader :users, :id

  def initialize(chatid)
    @id=chatid
    @@chats[chatid]=self
    @users=Set.new
  end

  def join(user)
    @users << user
  end

  def send_message(userid, message)
    @users.each { |user|
      user.receive_chat_message_notification(self.id,message,userid) unless user.id==userid
    }
  end
end
class Chat
  include ActiveModel::Serializers::JSON
  self.include_root_in_json = false
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

  def attributes
     @attributes ||= {:id => 'nil', :users=>'nil'}
   end

  def join(user)
    @users << user
  end

  def send_message(userid, message)
    @users.each { |user|
      user.receive_chat_message_notification(self.id,message,userid) unless user.id==userid
    }
  end

  def delete
    @@chats.delete(self.id)
  end

  def leave(user)
    if !user.respond_to?(:id)
      user=User.find(user)
    end
    @users.delete user
  end


end
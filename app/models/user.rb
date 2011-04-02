class User
  include ActiveModel::Serializers::JSON
  self.include_root_in_json = false
  attr_accessor :id

  @@users={}

  def initialize(id)
    @id=id
    @chats ={}
    @@users[id]=self
  end

  def attributes
     @attributes ||= {:id => 'nil'}
   end

  def get_mesages_for_chat(chatid)
    wait_for_messages(chatid)
    if no_messages_for_chat?(chatid)
      return ""
    else
      return extract_pending_messages(chatid)
    end
  end

  def receive_chat_message_notification(chatid, message,sender)
    if !@chats[chatid]
      @chats[chatid] = ["#{sender.id}:#{message}"]
    else
      @chats[chatid] << "#{sender.id}:#{message}"
    end
  end

  def self.find(user_id)
     @@users[user_id]
  end


  private
  def no_messages_for_chat?(chatid)
    !@chats[chatid] or @chats[chatid].empty?
  end

  def wait_for_messages(chatid)
    maxWaitingSeconds=3
    while (no_messages_for_chat?(chatid)) and maxWaitingSeconds>0
      sleep(1)
      maxWaitingSeconds -= 1
    end
  end

  def extract_pending_messages(chatid)
    last_messages=@chats[chatid].dup
    @chats[chatid].clear
    return last_messages
  end
end
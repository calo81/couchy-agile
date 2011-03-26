class User
  include ActiveModel::Serializers::JSON
  attr_accessor :id

  def initialize(id)
    @id=id
    @chats ={}
  end

  def get_mesages_for_chat(chatid)
    wait_for_messages(chatid)
    if no_messages_for_chat?(chatid)
      return ""
    else
      return extract_pending_messages(chatid)
    end
  end

  def receive_chat_message_notification(chatid, message,sender_id)
    if !@chats[chatid]
      @chats[chatid] = ["#{sender_id}:#{message}"]
    else
      @chats[chatid] << "#{sender_id}:#{message}"
    end
  end

  def self.find(userid)
     User.new(userid)
  end

  private
  def no_messages_for_chat?(chatid)
    !@chats[chatid] or @chats[chatid].empty?
  end

  def wait_for_messages(chatid)
    maxWaitingSeconds=30
    while (no_messages_for_chat?(chatid)) and maxWaitingSeconds>0
      sleep(0.5)
      maxWaitingSeconds -= 0.5
    end
  end

  def extract_pending_messages(chatid)
    last_messages=@chats[chatid].dup
    @chats[chatid].clear
    return last_messages
  end
end
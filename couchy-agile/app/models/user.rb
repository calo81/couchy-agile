class User
  attr_accessor :id

  def initialize(id)
    @id=id
    @chats ={}
  end

  def get_mesages_for_chat(chatid)
    while !@chats[chatid] or @chats[chatid].empty?
      sleep(0.5)
    end
    last_messages=@chats[chatid].dup
    @chats[chatid].clear
    return last_messages
  end

  def receive_chat_message(chatid, message)
    if !@chats[chatid]
      @chats[chatid] = [message]
    else
      @chats[chatid] << message
    end
  end
end
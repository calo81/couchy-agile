class ChatController  < ApplicationController
  def show
    user = User.find(params[:user_id])
    messages=user.get_mesages_for_chat(params[:id])
    messages.to_json
  end

  def update
    chat = Chat.find(params[:id])
    chat.send_message(params[:user_id],params[:message])
  end
end
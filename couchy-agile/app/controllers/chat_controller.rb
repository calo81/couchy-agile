class ChatController  < ApplicationController

  def index
    #render :json => Chat.all.to_json
  end

  def show
    user = User.find(params[:user_id])
    messages=user.get_mesages_for_chat(params[:id])
    messages.to_json
  end

  def update
    chat = Chat.find(params[:id])
    if chat and params[:message]
      chat.send_message(params[:user_id],params[:message])
    else
       chat=Chat.join(params[:user_id],params[:id])
    end
    render :json => chat.to_json
  end

  def create
    params[:id]=params[:name]
    update
  end

end
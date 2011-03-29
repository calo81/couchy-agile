class ChatController  < ApplicationController

  def index
    #render :json => Chat.all.to_json
  end

  def show
    user = User.find(params[:user_id])
    messages=user.get_mesages_for_chat(params[:id])
    render :json =>  messages.to_json
  end

  def update
    chat = Chat.find(params[:id])
    if chat and params[:message]
      chat.send_message(User.find(params[:user_id]),params[:message])
    else
       user = User.find(params[:user_id]) || User.new(params[:user_id])
       chat=Chat.join(User.find(params[:user_id]),params[:id])
    end
    render :json => chat.to_json
  end

  def create
    params[:id]=params[:name]
    update
  end

  def destroy
    render :json=>{}
  end

end
class TaskController < ApplicationController
  def create
    story = Story.find_by_title(params[:story])
    card = Task.new :story => story, :title => params[:title], :status => params[:status], :developer => params[:developer], :description => params[:description]
    card.save
    render  :json => {:id=>card.id}
  end
end
class TaskController < ApplicationController
  def create
    card = Task.new params
    card.save
    render  :json => card.to_json
  end
end
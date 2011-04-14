class CardController  < ApplicationController
  def create
    card = Card.new params
    card.save
    render  :json => card.to_json
  end
end
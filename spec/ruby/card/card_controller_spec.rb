require "spec_helper"

describe "CardController" do

  it "should create a card on POST" do
    controller = CardController.new
    card = Card.new :story=>1,:description=>"task1"
    Card.should_receive(:new).with(:story=>1,:description=>"task1").and_return(card)
    card.should_receive(:save)
    controller.should_receive(:render)
    controller.params={:story=>1,:description=>"task1"}
    controller.create
  end
end
require "spec_helper"

describe "Card" do

  it "should be able to be created and saved with task description and story" do
    card = Card.new :story => 1, :description => "Primera Task"
    card.save
    card.id.should_not be_nil
    card.story.should == 1
    card.description.should == "Primera Task"
  end
end
require "spec_helper"

describe "Card" do

  it "should be able to be created and saved with task description and story" do
    card = Card.new :story => 1, :description => "Primera Task", :title => "Task1"
    card.save
    card.id.should_not be_nil
    card.story.should == 1
    card.description.should == "Primera Task"
  end

  it "when saved can be retrieved by  title" do
    card = Card.new :story => 1, :description => "Primera Task", :title => "Task1"
    card.save
    found_card = Card.find_by_title "Task1"
    found_card.should_not be nil
    found_card.title.should == "Task1"
  end

end
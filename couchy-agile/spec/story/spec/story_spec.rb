require 'spec_helper'
describe Story do
  before(:each) do
     Story.delete_all
    end

  it "can be stored in mongo with title and description" do
    story=Story.new(:title=>'story 1',:description=>'desc 1')
    story.title.should=='story 1'
    story.save.should be_true
    retrievedStory = Story.find_by_title('story 1')
    retrievedStory.title.should == story.title
  end

  it "can't be stored in mongo if missing title" do
    story=Story.new(:description=>'desc 1')
    story.save.should be_false
  end
end
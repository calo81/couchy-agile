require "spec_helper"

describe "TaskController" do
  before(:each) do
      @controller = TaskController.new
  end
  it "should create a task on POST" do
    story = mock("story")
    card = mock("task")
    Story.should_receive(:find_by_title).with(1).and_return(story)
    Task.should_receive(:new).with(:story=>story,:title=>"task1",:status => :new, :developer=>nil, :description=>nil).and_return(card)
    card.should_receive(:save)
    card.stub(:id)
    @controller.should_receive(:render)
    @controller.params={:story=>1,:title=>"task1",:status => :new}
    @controller.create
  end

  it "should return all on Index" do

  end
end
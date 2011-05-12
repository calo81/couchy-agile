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
    Task.should_receive(:all).and_return [double("task1"),double("task2")]
    @controller.should_receive(:render)
    @controller.index
  end

  it "should update status on model when status different from saved" do
    task = Task.new :id=>5,:status=>:new
    Task.should_receive(:find_by_id).with(5).and_return(task)
    task.should_receive(:update_status)
    @controller.params = {:id=>5,:status=>:started}
    @controller.should_receive(:render)
    @controller.update
  end
end
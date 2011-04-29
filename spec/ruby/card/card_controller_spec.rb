require "spec_helper"

describe "TaskController" do

  it "should create a task on POST" do
    controller = TaskController.new
    card = Task.new :story=>1,:description=>"task1",:story =>Story.new, :status => :new
    Task.should_receive(:new).with(:story=>1,:description=>"task1").and_return(card)
    card.should_receive(:save)
    controller.should_receive(:render)
    controller.params={:story=>1,:description=>"task1"}
    controller.create
  end
end
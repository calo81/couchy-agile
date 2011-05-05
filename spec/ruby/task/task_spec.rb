require "spec_helper"

describe "Task" do

  before(:each) do
    Task.delete_all
  end

  it "should be able to be created and saved with task description and story" do
    card = Task.new :story => Story.new, :description => "Primera Task", :title => "Task1", :story =>Story.new, :status =>:new
    card.save
    card.id.should_not be_nil
    card.story.id.should_not be nil
    card.description.should == "Primera Task"
  end

  it "when saved can be retrieved by  title" do
    card = Task.new :story => 1, :description => "Primera Task", :title => "Task1", :story =>Story.new, :status =>:new
    card.save
    found_card = Task.find_by_title "Task1"
    found_card.should_not be nil
    found_card.title.should == "Task1"
  end

  it "should fail if saved without title" do
    card = Task.new :story => 1, :description => "Primera" , :story =>Story.new, :status =>:new
    card.save
    found_card = Task.find_by_description "Primera"
    found_card.should be nil
  end

  it "should fail if saved without story" do
    failed = false
    lambda{Task.new(:story => 1, :description => "Primera", :title => "Task1", :status =>:new)}.should raise_error
  end

  it "should fail if saved without status" do
    card = Task.new :story => 1, :description => "Primera", :title => "Task1", :story =>Story.new
    card.save
    found_card = Task.find_by_description "Primera"
    found_card.should be nil
  end

 it "shuld be able to change status and be persisted automatically" do
    card = Task.new :story => 1, :description => "Primera Task", :title => "Task1", :story =>Story.new, :status =>:new
    card.save
    found_card = Task.find_by_title "Task1"
    found_card.status.should be :new
    card.update_status :done
    found_card = Task.find_by_title "Task1"
    card.status.should be :done
  end

end
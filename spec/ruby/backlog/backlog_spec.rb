require 'spec_helper'

describe "Backlog" do
  before(:each)do
    Backlog.delete_all
  end

  it "should store many stories" do
    backlog = Backlog.new :name => "Backlog"
    backlog.stories << Story.new(:title => "1")
    backlog.stories << Story.new(:title => "2")
    backlog.stories.size.should == 2
    backlog.save
    found_backlog = Backlog.find_by_name("Backlog")
    found_backlog.stories.size.should == 2
  end
end
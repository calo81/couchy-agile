class Story
  include MongoMapper::Document
  key :title, String, :required=>true

  many :tasks

  def self.find_by_title!(title)
    self.find_by_title(title) || create_and_return(title)
  end

  private
  def self.create_and_return(title)
       story = Story.new :title => title
       story.save
       story
  end
end
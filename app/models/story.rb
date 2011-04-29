class Story
  include MongoMapper::Document
  key :title, String, :required=>true

  many :tasks
 
end
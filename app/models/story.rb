class Story
  include MongoMapper::Document


  key :title, String, :required=>true
 
end
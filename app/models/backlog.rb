class Backlog
  include MongoMapper::Document
  key :name, String, :required=>true

  many :stories
end
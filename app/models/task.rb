class Task
  include MongoMapper::Document
  include ActiveModel::Serializers::JSON
  self.include_root_in_json = false

  key :title, String, :required => true
  key :status, Symbol, :required => true
  belongs_to :story

  def update_status(status)
    self.status = status
    self.save
  end
end
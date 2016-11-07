class AddAttachmentPhotoToDishes < ActiveRecord::Migration
  def self.up
    change_table :dishes do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :dishes, :photo
  end
end

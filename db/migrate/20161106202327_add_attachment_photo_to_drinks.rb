class AddAttachmentPhotoToDrinks < ActiveRecord::Migration
  def self.up
    change_table :drinks do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :drinks, :photo
  end
end

class Category < ActiveRecord::Base

  #Paperclip attached images
  has_attached_file :photo, styles: { large: "600x600>", medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/

  #Relations
  belongs_to :menu

  has_many :dishes
  has_many :drinks

end

class Category < ActiveRecord::Base

  belongs_to :menu

  has_many :dishes
  has_many :drinks

end

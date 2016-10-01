class Order < ActiveRecord::Base

  belongs_to :client

  has_many :dishes
  has_many :drinks

end

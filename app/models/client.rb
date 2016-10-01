class Client < ActiveRecord::Base

  has_many :orders
  has_one :seat

end

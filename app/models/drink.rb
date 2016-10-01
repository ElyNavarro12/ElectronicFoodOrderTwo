class Drink < ActiveRecord::Base

    belongs_to :category

    has_many :ingridients

end

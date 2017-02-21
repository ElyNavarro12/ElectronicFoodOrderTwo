json.array!(@foods) do |food|
  json.extract! food, :id, :identifier, :iof, :name, :quantity, :price, :total, :order_id, :created_at, :updated_at
  json.url food_url(food, format: :json)
end

json.array!(@categories) do |gategory|
  json.extract! category, :id, :name, :menu_id
  json.url categories_url(category, format: :json)
end

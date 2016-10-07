class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.references :drink
      t.references :dish

      t.timestamps null: false
    end
  end
end

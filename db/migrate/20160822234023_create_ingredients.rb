class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.reference :drink
      t.reference :dish

      t.timestamps null: false
    end
  end
end

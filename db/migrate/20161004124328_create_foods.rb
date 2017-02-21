class CreateFoods < ActiveRecord::Migration
  def change
    create_table :foods do |t|
      t.integer :identifier
      t.string :iof
      t.string :name
      t.integer :quantity
      t.decimal :price
      t.decimal :total
      t.references :order

      t.timestamps null: false
    end
  end
end

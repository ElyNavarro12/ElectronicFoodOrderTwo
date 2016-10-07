class CreateFoods < ActiveRecord::Migration
  def change
    create_table :foods do |t|
      t.string :type
      t.integer :identifier
      t.references :order

      t.timestamps null: false
    end
  end
end

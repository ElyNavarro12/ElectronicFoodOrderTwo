class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.references :client
      t.decimal :total
      t.boolean :payed

      t.timestamps null: false
    end
  end
end

class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.reference :client
      t.decimal :total

      t.timestamps null: false
    end
  end
end

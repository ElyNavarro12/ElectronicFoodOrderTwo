class CreateSeats < ActiveRecord::Migration
  def change
    create_table :seats do |t|
      t.string :name
      t.references :employee
      t.references :client

      t.timestamps null: false
    end
  end
end

class CreateSeats < ActiveRecord::Migration
  def change
    create_table :seats do |t|
      t.string :name
      t.reference :employee
      t.reference :client

      t.timestamps null: false
    end
  end
end

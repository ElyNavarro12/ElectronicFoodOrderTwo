class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|

      t.string :name
      t.boolean :isDefault

      t.timestamps null: false
    end
  end
end

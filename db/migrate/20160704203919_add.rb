class Add < ActiveRecord::Migration
  def change
    add_column :restaurants, :photo, :string
  end
end

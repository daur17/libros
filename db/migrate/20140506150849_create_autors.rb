class CreateAutors < ActiveRecord::Migration
  def change
    create_table :autors do |t|
      t.string :nombre
      t.text :descripcion

      t.timestamps
    end
  end
end

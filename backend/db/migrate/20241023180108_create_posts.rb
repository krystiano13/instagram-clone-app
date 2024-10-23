class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.belongs_to :user
      t.string :description
      t.timestamps
    end
  end
end

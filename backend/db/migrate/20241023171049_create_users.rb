class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :email, index: { unique: true }
      t.string :password_digest
      t.string :description

      t.timestamps
    end
  end
end
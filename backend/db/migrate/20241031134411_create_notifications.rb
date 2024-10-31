class CreateNotifications < ActiveRecord::Migration[7.2]
  def change
    create_table :notifications do |t|
      t.belongs_to :user
      t.bigint :sender_id
      t.string :content
      t.timestamps
    end
  end
end

class Notification < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true
  validates :sender_id, presence: true
  validates :content, presence: true
end

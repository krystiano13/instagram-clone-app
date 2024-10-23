class Follower < ApplicationRecord
    validates :user_id, presence: true
    validates :follower_id, presence: true
end

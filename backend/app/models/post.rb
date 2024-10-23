class Post < ApplicationRecord
    has_one_attached :image

    validates :user_id, presence: true
    validates :description, presence: true

    belongs_to :user
end

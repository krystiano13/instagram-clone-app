require "test_helper"

class LikeTest < ActiveSupport::TestCase
  test "should create like" do
    like = Like.new(user_id: 1, post_id: 1)
    assert like.save
  end

  test "should not create like" do
    like_without_user = Like.new(post_id: 1)
    like_without_post = Like.new(user_id: 1)
    like_empty = Like.new

    assert_not like_empty.save
    assert_not like_without_post.save
    assert_not like_without_user.save
  end
end

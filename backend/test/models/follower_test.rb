require "test_helper"

class FollowerTest < ActiveSupport::TestCase
  test "should create follower" do
    follower = Follower.new(user_id: 1, follower_id: 2)
    assert follower.save
  end

  test "should not create follower" do
    follower_empty = Follower.new
    follower_without_user = Follower.new(follower_id: 2)
    follower_without_follower_id = Follower.new(user_id: 1)

    assert_not follower_empty.save
    assert_not follower_without_follower_id.save
    assert_not follower_without_user.save
  end
end

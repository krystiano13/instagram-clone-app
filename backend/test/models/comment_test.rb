require "test_helper"

class CommentTest < ActiveSupport::TestCase
  test "should create comment" do
    comment = Comment.new(user_id: 1, post_id: 1, text: "Nice")
    assert comment.save
  end

  test "should not create comment" do
    comment_1 = Comment.new
    comment_2 = Comment.new(user_id: 1, text: "text")
    comment_3 = Comment.new(post_id: 1, text: "text")
    comment_4 = Comment.new(user_id: 1, post_id: 1)

    assert_not comment_1.save
    assert_not comment_2.save
    assert_not comment_3.save
    assert_not comment_4.save
  end
end

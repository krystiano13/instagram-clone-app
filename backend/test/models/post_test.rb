require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "should show error when all columns are not provided" do
    post = Post.new
    assert_not post.save
  end

  test "should create post" do
    image = file_fixture("test.png")

    post = Post.new(user_id: 1, description: "desc", image: image)
    assert post.save
  end
end

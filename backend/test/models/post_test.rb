require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "should show error when all columns are not provided" do
    image = file_fixture("test.png")

    post_empty = Post.new
    post = Post.new(user_id: 1, image: image)
    post_without_image = Post.new(user_id: 1, description: "desc")

    assert_not post_empty.save
    assert_not post.save
    assert_not post_without_image.save
  end

  test "should not create post when user does not exists" do
    image = file_fixture("test.png")

    post = Post.new(user_id: 0, description: "desc", image: image)
    assert_not post.save
  end

  test "should create post" do
    image = file_fixture("test.png")

    post = Post.new(user_id: 1, description: "desc", image: image)
    assert post.save
  end
end

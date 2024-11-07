require "test_helper"

class CommentControllerTest < ActionDispatch::IntegrationTest
  test "should return array of comments" do
    create_mock_user
    get "/comments/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response :success
  end
end

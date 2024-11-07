require "test_helper"

class CommentControllerTest < ActionDispatch::IntegrationTest
  test "should return array of comments" do
    create_mock_user
    get "/comments/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response :success
  end

  test "create action should return 200" do
    create_mock_user
    post "/comments", params: { text: "test", user_id: 1, post_id: 1 }, headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200
  end

  test "create action should return 422" do
    create_mock_user

    post "/comments", params: { user_id: 1, post_id: 1 }, headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 422

    post "/comments", params: { text: "test", post_id: 1 }, headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 422

    post "/comments", params: { text: "test", user_id: 1 }, headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 422
  end

  test "create action should return 401" do
    post "/comments", params: { text: "test", user_id: 1, post_id: 1 }
    assert_response 401
  end
end

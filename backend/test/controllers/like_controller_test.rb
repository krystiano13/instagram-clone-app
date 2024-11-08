require "test_helper"

class LikeControllerTest < ActionDispatch::IntegrationTest
  test "should create like" do
    create_mock_user
    post "/likes", headers: { Authorization: "Bearer #{create_mock_token}" }, params: { user_id: 1, post_id: 1 }
    assert_response 200
  end

  test "should show 422 error" do
    create_mock_user

    post "/likes", headers: { Authorization: "Bearer #{create_mock_token}" }, params: { user_id: 1 }
    assert_response 422

    post "/likes", headers: { Authorization: "Bearer #{create_mock_token}" }, params: { post_id: 1 }
    assert_response 422

    post "/likes", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 422
  end

  test "should show 401 error" do
    post "/likes", params: { user_id: 1, post_id: 1 }
    assert_response 401
  end
end

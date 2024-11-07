require "test_helper"

class FollowerControllerTest < ActionDispatch::IntegrationTest
  test "should return followers" do
    create_mock_user
    get "/followers/1/2", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200
  end

  test "should show 401 error on trying to return followers" do
    get "/followers/1/2"
    assert_response 401
  end

  test "should create follower" do
    create_mock_user
    post "/followers",
         headers: { Authorization: "Bearer #{create_mock_token}" },
         params: { user_id: 1, follower_id: 2 }
    assert_response 200
  end

  test "should return 401 error on follower creation" do
    post "/followers",
         params: { user_id: 1, follower_id: 2 }
    assert_response 401
  end

  test "should return 422 error on follower creation" do
    create_mock_user

    post "/followers",
         headers: { Authorization: "Bearer #{create_mock_token}" },
         params: { user_id: 1 }
    assert_response 422

    post "/followers",
         headers: { Authorization: "Bearer #{create_mock_token}" },
         params: { follower_id: 2 }
    assert_response 422
  end
end

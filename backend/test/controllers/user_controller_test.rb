require "test_helper"

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should create user" do
    post "/user", params: { user_name: "testuser", email: "test@user", password: "123456" }
    assert_response 201
  end

  test "should not create user" do
    post "/user", params: { email: "test@user", password: "123456" }
    assert_response 503

    post "/user", params: { user_name: "testuser", password: "123456" }
    assert_response 503

    post "/user", params: { user_name: "testuser", email: "test@user" }
    assert_response 503
  end

  test "should update user" do
    create_mock_user
    patch "/user/1", headers: { Authorization: "Bearer #{create_mock_token}" }, params: { description: "test" }
    assert_response 200
  end

  test "should not update user" do
    create_mock_user
    patch "/user/1", params: { description: "test" }
    assert_response 401
  end

  test "should search user" do
    create_mock_user
    get "/user/search/test", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200
  end

  test "should not search user" do
    create_mock_user
    get "/user/search/test"
    assert_response 401
  end

  test "should show single user" do
    create_mock_user
    get "/user/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200
  end

  test "should not show single user" do
    create_mock_user
    get "/user/1"
    assert_response 401
  end
end

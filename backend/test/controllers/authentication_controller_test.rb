require "test_helper"

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test "should log in" do
    create_mock_user
    post "/auth/login", params: { email: "test@test", password: "123456" }
    assert_response :success
  end

  test "should not log in without password" do
    create_mock_user
    post "/auth/login", params: { email: "test@test"}
    assert_response 401
  end

  test "should not log in without email" do
    create_mock_user
    post "/auth/login", params: { password: "123456" }
    assert_response 401
  end
end

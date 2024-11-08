require "test_helper"

class NotificationControllerTest < ActionDispatch::IntegrationTest
  test "should return array with 200 code" do
    create_mock_user
    get "/notifications/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200
  end

  test "should return count with 200 code" do
    create_mock_user
    get "/notifications/count/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200
  end

  test "should return 401 error" do
    get "/notifications/count/1"
    assert_response 401

    get "/notifications/1"
    assert_response 401
  end
end

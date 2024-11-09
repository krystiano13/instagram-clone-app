require "test_helper"

class PostControllerTest < ActionDispatch::IntegrationTest
  test "should return posts with 200 status" do
    create_mock_user

    get "/posts", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200

    get "/posts/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200

    get "/posts/followers/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200

    get "/posts/user/1", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 200
  end

  test "should return 404 error on SHOW" do
    create_mock_user
    get "/posts/123456", headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 404
  end

  test "should create post" do
    create_mock_user

    file = fixture_file_upload(file_fixture("test.png"), "image/*")

    post "/posts",
         headers: { Authorization: "Bearer #{create_mock_token}" },
         params: { description: "test", user_id: 1, image: file }
    assert_response 200
  end

  test "should not create post" do
    create_mock_user

    post "/posts",
         headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 422
  end

  test "should update post" do
    create_mock_user

    file = fixture_file_upload(file_fixture("test.png"), "image/*")

    patch "/posts/1",
          headers: { Authorization: "Bearer #{create_mock_token}" },
          params: { description: "test", user_id: 1, image: file }
    assert_response 200
  end

  test "should not update post" do
    create_mock_user

    patch "/posts/1",
          headers: { Authorization: "Bearer #{create_mock_token}" }
    assert_response 422
  end
end

require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should create user" do
    user = User.new(user_name: "test123", email: "test@test", password: "123456")
    assert user.save
  end

  test "should not create user" do
    user = User.new(user_name: "test123", email: "Test@Account", password: "123456")
    user_1 = User.new(user_name: "test123", email: "Test1@Account")
    user_2 = User.new(email: "Test2@Account", password: "123456")
    user_3 = User.new(user_name: "test123", password: "123456")

    assert_not user.save
    assert_not user_1.save
    assert_not user_2.save
    assert_not user_3.save
  end
end

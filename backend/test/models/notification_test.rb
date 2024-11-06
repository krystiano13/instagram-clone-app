require "test_helper"

class NotificationTest < ActiveSupport::TestCase
  test "should create notification" do
    notification = Notification.new(user_id: 1, sender_id: 2, content: "notification")
    assert notification.save
  end

  test "should not create notification when user does not exists" do
    notification = Notification.new(user_id: 0, sender_id: 2, content: "notification")
    assert_not notification.save
  end

  test "should not create notification" do
    notification = Notification.new(user_id: 1, sender_id: 2)
    notification_without_sender = Notification.new(user_id: 1, content: "test")

    assert_not notification.save
    assert_not notification_without_sender.save
  end
end

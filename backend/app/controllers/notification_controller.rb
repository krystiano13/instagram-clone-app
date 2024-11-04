class NotificationController < ApplicationController
  def index
    notifications = Notification.where(user_id: params[:user_id])
    notifications_with_username = []

    notifications.each do |notification|
      user = User.find_by(id: notification[:sender_id])
      notifications_with_username.unshift(
        {
          id: notification[:id],
          user_id: notification[:user_id],
          sender_id: notification[:sender_id],
          content: "#{user[:user_name]} #{notification[:content]}"
        }
      )
    end

    render json: {
      notifications: notifications_with_username
    }, status: :ok
  end

  def index_count
    notifications_count = Notification.where(user_id: params[:user_id]).count
    render json: {
      count: notifications_count
    }, status: :ok
  end

  def destroy
    notification = Notification.find(params[:id])

    if notification.present?
      notification.destroy
    end
  end
end

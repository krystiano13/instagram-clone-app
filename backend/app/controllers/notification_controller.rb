class NotificationController < ApplicationController
  def index
    notifications = Notification.where(user_id: params[:user_id])
    render json: {
      notifications: notifications
    }, status: :ok
  end

  def destroy
    notification = Notification.find(params[:id])

    if notification.present?
      notification.destroy
    end
  end
end

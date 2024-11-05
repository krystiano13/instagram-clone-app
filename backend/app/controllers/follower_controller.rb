class FollowerController < ApplicationController
    def index
        follower_id = params[:follower_id]
        user_id = params[:user_id]

        if follower_id and user_id
            follow = Follower.where(user_id: user_id).where(follower_id: follower_id)

            render json: {
                follow: follow
            }, status: 200
        else
            render json: {
                errors: ["Follow not found"]
            }, status: 404
        end
    end

    def create
        follower = Follower.new(follower_params)

        if follower.save
            notification = Notification.new(user_id: params[:user_id], sender_id: params[:follower_id], content: "followed you")
            notification.save

            render json: {
                follower: follower
            }, status: 200
        else
            render json: {
                errors: follower.errors
            }, status: :unprocessable_entity
        end
    end

    def destroy
        follow = Follower.find(params[:id])

        follow.destroy

        render json: {
            message: "Deleted"
        }, status: 200
    end

    private
    def follower_params
        params.permit(:user_id, :follower_id)
    end
end
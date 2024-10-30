class LikeController < ApplicationController
    def create
        like = Like.new(like_params)

        if like.save
            render json: {
                :like => like
            }, status: 200
        else
            render json: {
                :errors => like.errors
            }, status: 422
        end
    end

    def destroy
        like = Like.where(user_id: params[:user_id]).and(Like.where(post_id: params[:post_id]))
        like.destroy_all
    end

    private
    def like_params
        params.permit(:user_id, :post_id)
    end
end

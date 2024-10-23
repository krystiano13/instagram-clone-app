class LikeController < ApplicationController
    def create
        like = Like.new(like_params)

        if like.save
            return render json: {
                :like => like
            }, status: 200
        else
            return render json: {
                :errors => like.errors
            }, status: 422
        end
    end

    def destroy
        like = like.find(params[:id])
        like.destroy
    end

    private
    def like_params
        params.permit(:user_id, :post_id)
    end
end

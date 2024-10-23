class CommentController < ApplicationController
    def index
        comments = Comment.where(post_id: params[:post_id])
        return render json: {
            :comments => comments
        }, status: 200
    end

    def create
        comment = Comment.new(comment_params)

        if comment.save
            render json: {
                :comment => comment
            }, status: 200
        else
            render json: {
                :errors => comment.errors
            }, status: 422
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
    end

    private 
    def comment_params
        params.permit(:text, :user_id, :post_id)
    end
end

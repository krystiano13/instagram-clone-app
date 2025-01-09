class CommentController < ApplicationController
    def index
        comments = Comment.includes(:user).where(post_id: params[:post_id])

        comments_with_users = comments.map do |comment|
            { comment: comment, user_name: comment.user.user_name }
        end

        render json: {
            comments: comments_with_users
        }, status: 200
    end

    def create
        comment = Comment.new(comment_params)

        post = Post.find_by(id: params[:post_id])

        if comment.save
            if post.present?
                notification = Notification.new(user_id: post[:user_id], sender_id: params[:user_id], content: "commented your post")
                notification.save
            end

            render json: {
                comment: comment
            }, status: 200
        else
            render json: {
                errors: comment.errors
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

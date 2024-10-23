class PostController < ApplicationController
    skip_before_action :authenticate_user
    def index
        @posts = Post.order(created_at: :desc)
        posts_with_likes = []

        likes = Like.where(user_id: params[:user_id])
        likes_post_ids = []

        likes.each do |like|
            likes_post_ids.push(like[:post_id])
        end

        @posts.each do |post|
            if likes_post_ids.include?(post[:id])
                posts_with_likes.unshift([:post => post, :like => true])
            else
                posts_with_likes.unshift([:post => post, :like => false])
            end
        end

        render json: {
            :posts => posts_with_likes
        }, status: 200
    end

    def show
        post = Post.find(params[:id])
        like = false

        like_value = Like.where(post_id: params[:id])

        if like_value.present?
            like = true
        end

        if post.present?
            render json: {
                :post => post,
                :like => like
            }, status: 200
        else
            render json: {
                :errors => ["Not found"]
            }, status: 404
        end
    end

    def index_follows_only
        followers = Follower.where(follower_id: params[:user_id])
        follower_ids = []

        followers.each do |follower|
            follower_ids.push(follower[:user_id])
        end

        posts = Post.where(user_id: follower_ids)
        posts_with_likes = []

        likes = Like.where(user_id: params[:user_id])
        likes_post_ids = []

        likes.each do |like|
            likes_post_ids.push(like[:post_id])
        end

        posts.each do |post|
            if likes_post_ids.include?(post[:id])
                posts_with_likes.unshift([:post => post, :like => true])
            else
                posts_with_likes.unshift([:post => post, :like => false])
            end
        end

        render json: {
            :posts => posts_with_likes,
            :followers => followers,
            :user_id => params[:user_id]
        }, status: 200
    end

    def create
        post = Post.new(post_params)

        if post.save
            render json: {
                :post => post
            }, status: 200
        else
            render json: {
                :errors => post.errors
            }, status: 422
        end
    end

    def update
        post = post.find(params[:id])

        if post.update(post_params)
            render json: {
                :post => post
            }
        else
            render json: {
                :errors => post.errors
            }, status: 422
        end
    end

    def destroy
        post = post.find(params[:id])
        post.destroy
    end

    private
    def post_params
        params.permit(:image, :description, :user_id)
    end
end

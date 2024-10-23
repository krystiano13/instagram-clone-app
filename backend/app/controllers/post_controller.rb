class PostController < ApplicationController
    skip_before_action :authenticate_user
    def index
        @posts = Post.order(created_at: :desc)
        render json: {
            :posts => @posts
        }, status: 200
    end

    def show
        post = post.find(params[:id])

        if post.present?
            render json: {
                :post => post
            }, status: 200
        else
            render json: {
                :errors => ["Not found"]
            }, status: 404
        end
    end

    def index_follows_only
        followers = Follower.where("follower_id", params[:user_id])
        follower_ids = []

        followers.each do |follower|
            follower_ids.push(follower[:user_id])
        end

        posts = Post.where("user_id", follower_ids)
        render json: {
            :posts => posts
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

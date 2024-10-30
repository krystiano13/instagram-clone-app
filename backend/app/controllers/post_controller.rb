class PostController < ApplicationController
    def index
        @posts = Post.order(created_at: :desc)
        posts_with_likes = []

        likes = Like.where(user_id: params[:user_id])
        likes_post_ids = []

        likes.each do |like|
            likes_post_ids.push(like[:post_id])
        end

        posts_with_images = @posts.map do |post|
            if post.image.attached?
                post.as_json.merge(image: url_for(post.image))
            else
                post.as_json.merge(image: nil)
            end
        end

        posts_with_images.each do |post|
            user = User.find_by(id: post.values[1])
            if likes_post_ids.include?(post[:id])
                posts_with_likes.unshift({:post => post, :like => true, :name => user[:user_name]})
            else
                posts_with_likes.unshift({:post => post, :like => false, :name => user[:user_name]})
            end
        end

        render json: {
            :posts => posts_with_likes
        }, status: 200
    end

    def index_by_user
        posts = Post.where(user_id: params[:user_id]).order(created_at: :desc)

        posts_with_images = posts.map do |post|
            if post.image.attached?
                post.as_json.merge(image: url_for(post.image))
            else
                post.as_json.merge(image: nil)
            end
        end

        render json: {
          posts: posts_with_images
        }, status: :ok
    end

    def show
        begin
            post = Post.find(params[:id])
            like = false
            post_with_image = []

            like_value = Like.where(post_id: params[:id])

            user = User.find_by(id: post[:user_id])

            if like_value.present?
                like = true
            end

            if post.image.attached?
                post_with_image = post.as_json.merge(image: url_for(post.image))
            else
                post_with_image = post.as_json.merge(image: nil)
            end

            render json: {
                :post => post_with_image,
                :like => like,
                :name => user[:user_name]
            }, status: 200
        rescue
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

        posts_with_images = posts.map do |post|
            if post.image.attached?
                post.as_json.merge(image: url_for(post.image))
            else
                post.as_json.merge(image: nil)
            end
        end

        posts_with_images.each do |post|
            user = User.find_by(id: post.values[1])
            like = Like.where(user_id: params[:user_id]).and(Like.where(post_id: post.values[0]))

            if like.count > 0
                posts_with_likes.unshift({post: post, like: true, name: user[:user_name]})
            else
                posts_with_likes.unshift({post: post, like: false, name: user[:user_name]})
            end
        end

        render json: {
            :posts => posts_with_likes,
            :followers => followers,
            :user_id => params[:user_id],
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

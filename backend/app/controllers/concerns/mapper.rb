module Mapper
  private
  def map_images
    @posts_with_images = @posts.map do |post|
      if post.image.attached?
        post.as_json.merge(image: url_for(post.image))
      else
        post.as_json.merge(image: nil)
      end
    end
  end

  private
  def map_likes
    @posts_with_likes = []

    @posts_with_images.each do |post|
      user = User.find_by(id: post.values[1])
      like = Like.where(user_id: params[:user_id]).and(Like.where(post_id: post.values[0]))

      if like.count > 0
        @posts_with_likes.unshift({post: post, like: true, name: user[:user_name]})
      else
        @posts_with_likes.unshift({post: post, like: false, name: user[:user_name]})
      end
    end
  end
end
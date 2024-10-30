Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  resources :user
  get "user/search/:user_name", to: "user#search"
  post "auth/login", to: "authentication#login"

  get "followers/:user_id/:follower_id", to: "follower#index"
  post "followers", to: "follower#create"
  delete "followers/:user_id/:follower_id", to: "follower#destroy"

  get "posts", to: "post#index"
  get "posts/:id", to: "post#show"
  get "posts/followers/:user_id", to: "post#index_follows_only"
  get "posts/user/:user_id", to: "post#index_by_user"
  post "posts", to: "post#create"
  patch "posts/:id", to: "post#update"
  delete "posts/:id", to: "post#destroy"

  post "likes", to: "like#create"
  delete "likes/:user_id/:post_id", to: "like#destroy"

  get "comments/:post_id", to: "comment#index"
  post "comments", to: "comment#create"
  delete "comments/:id", to: "comment#destroy"
end

class AuthenticationController < ApplicationController
    skip_before_action :authenticate_user

    include JwtToken

    def login
        @user = User.find_by_email(params[:email])

        if @user&.authenticate(params[:password])
            token = jwt_encode([:user_id => @user.id])
            time = Time.now + 24.hours.to_i
            render json: {
                token: token,
                username: @user.user_name
            }, status: :ok
        else
            render json: { errors: ["Unathorized"] }, status: 401
        end
    end
end
class ApplicationController < ActionController::API
    include JwtToken

    before_action :authenticate_user

    private
    def authenticate_user
        header = request.headers['Authorization']
        header = header.split(' ').last if header

        begin
            @decoded = jwt_decode(header)
            @current_user = User.find(@decoded[0]["user_id"])
        rescue ActiveRecord::RecordNotFound => e
            render json: { errors: e.message }, status: 401
        rescue JWT::DecodeError => e
            render json: { errors: e.message }, status: 401
        end
    end
end

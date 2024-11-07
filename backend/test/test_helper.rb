ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"
require "json"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def create_mock_user
      user = User.new(email: "test@test", user_name: "test", password: "123456")
      user.save
    end

    def create_mock_token
      post "/auth/login", params: { email: "test@test", password: "123456" }
      ::JSON.parse(response.body)["token"]
    end
  end
end

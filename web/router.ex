defmodule ApiTest.Router do
  use ApiTest.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Other scopes may use custom stacks.
  scope "/api", ApiTest do
    pipe_through :api

    resources "/posts", PostController

    #Users
    post "/register", RegistrationController, :create

    get "/users", UserController, :index
  end
  
  scope "/", ApiTest do
    pipe_through :browser # Use the default browser stack

    get "*path", PageController, :index
  end

end

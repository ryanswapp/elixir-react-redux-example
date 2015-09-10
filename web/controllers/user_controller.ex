defmodule ApiTest.UserController do
  use ApiTest.Web, :controller

  alias ApiTest.User
  alias ApiTest.Repo

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users) 
  end
end

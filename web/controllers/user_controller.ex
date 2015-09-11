defmodule ApiTest.UserController do
  use ApiTest.Web, :controller

  alias ApiTest.User
  alias ApiTest.Repo

  plug Guardian.Plug.EnsureAuthenticated, on_failure: { ApiTest.SessionController, :unauthenticated_api }

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users) 
  end

  def current_user(conn, %{"jwt" => jwt}) do
    case Guardian.decode_and_verify(jwt) do
      { :ok, claims } -> 
        id = claims["sub"] |> String.replace("User:", "") |> String.to_integer
        result = Repo.get!(User, id)
        user = put_in(result.crypted_password, "")
        IO.inspect get_in(user, [:crypted_password])
        conn
        |> put_status(:ok)
        |> render("show.json", user: user)
      { :error, reason } ->
        conn
        |> put_status(:not_found)
        |> render(ApiTest.SessionView, "error.json", error: "Not Found")
    end
  end
end

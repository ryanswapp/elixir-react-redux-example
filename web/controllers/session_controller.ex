defmodule ApiTest.SessionController do
  use ApiTest.Web, :controller

  def create(conn, %{"session" => session_params}) do
    case ApiTest.Session.authenticate(session_params, ApiTest.Repo) do
      # If the user is authenticated, send back a new JWT
      {:ok, user} ->
        { :ok, jwt, full_claims } = Guardian.encode_and_sign(user, :token)
        conn
        |> put_status(:created)
        |> render(ApiTest.SessionView, "show.json", jwt: jwt)
      :error ->
        conn
        |> put_status(:unprocessable_entity)
    end
  end

  def unauthenticated_api(conn, _params) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(ApiTest.SessionView, "error.json", error: "Not Authenticated")
  end
end

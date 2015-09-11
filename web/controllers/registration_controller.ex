defmodule ApiTest.RegistrationController do
  use ApiTest.Web, :controller

  alias ApiTest.User

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    if changeset.valid? do
      {status, user} = ApiTest.Registration.create(changeset, ApiTest.Repo)

      conn
      |> put_status(:created)
      |> render(ApiTest.UserView, "show.json", user: user)
    else
      conn
      |> put_status(:unprocessable_entity)
      |> render(ApiTest.ChangesetView, "error.json", changeset: changeset)
    end
  end
end

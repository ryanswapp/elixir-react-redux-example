defmodule ApiTest.UserView do
  use ApiTest.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, ApiTest.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, ApiTest.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email}
  end
end


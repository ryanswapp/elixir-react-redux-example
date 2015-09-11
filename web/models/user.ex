defmodule ApiTest.User do
  use ApiTest.Web, :model
  @derive Access

  schema "users" do
    field :email, :string
    field :crypted_password, :string
    field :password, :string, virtual: true

    timestamps
  end

  @required_fields ~w(email password)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:email, on: ApiTest.Repo, downcase: true)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
  end

  def filter_password(user) do
    user
    |> HashDict.drop(:crypted_password)
  end
end

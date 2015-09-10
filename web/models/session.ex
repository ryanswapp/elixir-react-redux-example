defmodule ApiTest.Session do
  alias ApiTest.User

  def authenticate(params, repo) do
    user = repo.get_by(User, email: String.downcase(params["email"]))
    case check_password(user, params["password"]) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> false
      _ -> Comeonin.Bcrypt.checkpw(password, user.crypted_password)
    end
  end
end

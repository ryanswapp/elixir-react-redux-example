use Mix.Config

config :api_test, ApiTest.Endpoint,
  http: [port: System.get_env("PORT")],
  url: [scheme: "https", host: "swapp-elixir-posts.herokuapp.com", port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/manifest.json"

# Do not print debug messages in production
config :logger, level: :info

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section and set your `:url` port to 443:
#
#     config :api_test, ApiTest.Endpoint,
#       ...
#       url: [host: "example.com", port: 443],
#       https: [port: 443,
#               keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#               certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables return an absolute path to
# the key and cert in disk or a relative path inside priv,
# for example "priv/ssl/server.key".
#
# We also recommend setting `force_ssl`, ensuring no data is
# ever sent via http, always redirecting to https:
#
#     config :api_test, ApiTest.Endpoint,
#       force_ssl: [hsts: true]
#
# Check `Plug.SSL` for all available options in `force_ssl`.

# ## Using releases
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :api_test, ApiTest.Endpoint, server: true
#

# Finally import the config/prod.secret.exs
# which should be versioned separately.
config :api_test, ApiTest.Endpoint,
  secret_key_base: System.get_env("SECRET_KEY_BASE")
  #"d+Sg4SA3Fep3DahMsD+fGQbTJn4SVR5NyVwZm1cpwiongZokF199AIUdSas3yVx5"

# Configure your database
config :api_test, ApiTest.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: 20

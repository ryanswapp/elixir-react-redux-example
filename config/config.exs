# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :api_test, ApiTest.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "J+Z7Ny9pWvr0hoKY3vzgL7LLpg6tarNxWB9FcWeaKJiYzsUvlBBMBQS90j9sBgnA",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: ApiTest.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  issuer: "ApiTest",
  ttl: { 3, :days },
  verify_issuer: true,
  secret_key: "vMmKtIzw98Sfn8TcIds9YJNQgOZKemKOnohjm5/OEyZgB22smQI+fqHKWa3BV6wQ",
  serializer: ApiTest.GuardianSerializer


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

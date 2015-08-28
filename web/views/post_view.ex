defmodule ApiTest.PostView do
  use ApiTest.Web, :view

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, ApiTest.PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, ApiTest.PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
      title: post.title,
      body: post.body}
  end
end

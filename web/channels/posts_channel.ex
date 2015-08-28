defmodule ApiTest.PostsChannel do
  use Phoenix.Channel

  def join("posts:new", _auth_msg, socket) do
    {:ok, socket}
  end

  def handle_in("new:post", %{"post" => post}, socket) do
    broadcast! socket, "new:post", %{post: post}
    {:noreply, socket}
  end

  def handle_in("remove:post", %{"post_id" => postId}, socket) do
    broadcast! socket, "remove:post", %{post_id: postId}
    {:noreply, socket}
  end
end

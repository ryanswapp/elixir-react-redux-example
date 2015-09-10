import "../css/app.css";
import React from 'react';
import Router from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import routes from './config/routes.js';
import { Socket } from "../../../deps/phoenix/web/static/js/phoenix"
import Actions from "./redux/action_creators.js";

let socket = new Socket("/socket");
socket.connect();

let channel = socket.channel("posts:new", {});
channel.join().receive("ok", chan => {
    console.log("joined");
});
channel.on("new:post", payload => {
  console.log("There is a new post!");
  store.dispatch(Actions.addPost(payload.post));
});
channel.on("remove:post", payload => {
  console.log("Post has been removed");
  store.dispatch(Actions.removePost(payload.post_id));
});

window.onload = () => {
  Router.run(routes, Router.HistoryLocation, (Root, state) => {
    React.render(
      <Provider store={store}>
       {() => <Root {...state} channel={channel}/>}
      </Provider>, 
      document.getElementById('app')
    );
  });
}

import React from 'react';
import UsersList from './UsersList';
import Auth from '../../config/auth.js';
import UserLogin from './UserLogin';
import { connect } from 'react-redux';


class UsersListContainer extends React.Component {
  render () {
    if (!Auth.loggedIn()) {
      console.log("Not authorized!");
      this.context.router.transitionTo('/login');
    } else {
      return <UsersList currentUser={this.props.currentUser}/>;
    }
  }
}

UsersListContainer.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default connect(state => ({
  currentUser: state.currentUser
}))(UsersListContainer);

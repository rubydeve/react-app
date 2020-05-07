import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { config } from '../config';

import ActionCable from 'actioncable'
import {ActionCableProvider, ActionCableConsumer} from 'react-actioncable-provider'

const cable = ActionCable.createConsumer(`${config.cableUrl}`);


class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.handleReceived = this.handleReceived.bind(this);
    }

    handleReceived(message) {
       console.log(message)
    }


    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        console.log(users)
        return (
            <ActionCableProvider cable={cable} >
                <ActionCableConsumer channel="AppearanceChannel"  />
                <div className="col-md-6 col-md-offset-3">
                    <h1>Hi {user.user_name} peer_id {user.peer_id}!</h1>
                    <p>You're logged in with React q!!</p>
                    <h3>All registered users:</h3>
                    <Link to="/login">Logout</Link>
                    <Link to="/friendsList">friendsList</Link>
                    

                </div>
            
            </ActionCableProvider>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
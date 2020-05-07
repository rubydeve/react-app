import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import ActionCable from 'actioncable';
import { config } from '../config';
import {ActionCableProvider, ActionCableConsumer} from 'react-actioncable-provider'

const cable = ActionCable.createConsumer(`${config.cableUrl}`);


class ChatMessage extends React.Component {

	constructor(props){
		super(props);
    	const { user, users } = this.props;

		this.state = {
			user: user,
			users: users,
			messages: [],
			receiver: 2,
			// connected: false,
			cable: cable

		}
       
        this.handleReceived = this.handleReceived.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleMessage = this.handleMessage.bind(this);
		this.handleConnected = this.handleConnected.bind(this);
		this.handleDisconnected = this.handleDisconnected.bind(this);
		this.loadMessages = this.loadMessages.bind(this);
		// if (this.state.connected) {
  //          console.log("we are here")
		// }
	}

	componentDidMount() {


	}

	loadMessages(){
		console.log("loadMessages")
		this.state.cable.subscriptions.subscriptions[1].perform("load" ,{sender_id: this.state.user.id ,receiver_id: this.state.receiver})
	}

	handleReceived(message) {
	
		console.log(message)

	}

	handleChange(event){
		let value = event.target.value
		if (event.keyCode == 13){
			console.log("event.target.value")
			this.handleMessage(event.target.value)

		}
	}

	handleConnected(){
        console.log("connected ")
   
        // this.setState({connected: true})
		
	}

	handleDisconnected(){
      console.log("disconnected ")
	}

	

	handleMessage(message) {
		this.state.cable.subscriptions.subscriptions[1].perform("send_message",{message: message , sender_id: this.state.user.id ,receiver_id: this.state.receiver })
		const orientation = "text-left";
		if (message.from === this.state.user.id ) {
			const orientation = "text-right"
		}
		var messageHTML = (
	    	`<p class="list-group-item"  ${orientation }">
			 <h4 class="list-group-item-heading"> ${ message.from } </h4>
			 <p class="list-group-item-text"> ${ message.text } </p> </p>`
	    );
	    let ms = this.state.messages;
        ms.push(messageHTML)
        this.setState({messages: ms})
    }


    render() {

    	return (
           
    		<ActionCableProvider cable={cable} >
    		<ActionCableConsumer channel="AppearanceChannel" />
            <ActionCableConsumer channel="ChatChannel" onReceived={this.handleReceived} onConnected={this.handleConnected} onDisconnected={this.handleDisconnected}/>

    		<div className="col-md-6 col-md-offset-3">
    		<h1>Hi {this.state.user.user_name} peer_id {this.state.user.peer_id}!</h1>
    		<p>You'r Friends List!!</p>
    		<div id="message" >
    		  
    		 { 
    			  this.state.messages.map(function(object, i){
					return  object;
    		     })
    		 } 
    		</div>
    		<input onKeyUp={this.handleChange} />
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



const connectedChatMessage = connect(mapState)(ChatMessage);
export { connectedChatMessage as ChatMessage };
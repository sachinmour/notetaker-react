var React = require('react');
var Router = require("react-router").Router;
import Repos from "./Github/Repos";
import UserProfile from "./Github/UserProfile";
import Notes from "./Notes/Notes";
var ReactFireMixin = require("reactfire");
var Firebase = require("firebase");
import getGithubInfo from '../utils/helpers';

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  
  getInitialState: function () {
    return {
      notes: [1, 2, 3],
      repos: ['a', 'b', 'c'],
      bio: {
        name: "Sachin Mour"
      }
    };
  },
  
  componentDidMount: function () {
    this.ref = new Firebase('https://incandescent-fire-4223.firebaseio.com/');
    this.init(this.props.params.username);
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.unbind('notes');
    this.init(nextProps.params.username);
  },
  
  componentWillUnmount: function () {
    this.unbind('notes');
  },
  
  init: function(username) {
    var childRef = this.ref.child(username);
    this.bindAsArray(childRef, 'notes');
    
    getGithubInfo(username)
      .then(function (data) {
        this.setState({
          bio: data.bio.data,
          repos: data.repos
        });
      }.bind(this));
  },
  
  handleAddNote: function (newNote) {
    // update firebase, with the newNote
    this.ref.child(username).child(this.state.notes.length).set(newNote);
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile  bio={this.state.bio} username={username} />
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes 
            username={username}
            notes={this.state.notes} 
            addNote={this.handleAddNote}
            />
        </div>
      </div>
    );
  }
  
});

module.exports=Profile;
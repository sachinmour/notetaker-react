var React = require('react');
var Router = require("react-router").Router;
var Repos = require("./Github/Repos");
var UserProfile = require("./Github/UserProfile");
var Notes = require("./Notes/Notes");
var ReactFireMixin = require("reactfire");
var Firebase = require("firebase");
var helpers = require("../utils/helpers.js");

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
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef, 'notes');
    
    helpers.getGithubInfo(this.props.params.username)
      .then(function (data) {
        this.setState({
          bio: data.bio,
          repos: data.repos
        });
      }.bind(this));
  },
  
  componentWillUnmount: function () {
    this.unbind('notes');
  },
  
  handleAddNote: function (newNote) {
    // update firebase, with the newNote
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile  bio={this.state.bio} username={this.props.params.username} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes 
            username={this.props.params.username}
            notes={this.state.notes} 
            addNote={this.handleAddNote}
            />
        </div>
      </div>
    );
  }
  
});

module.exports=Profile;
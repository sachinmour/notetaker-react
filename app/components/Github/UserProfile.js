var React = require("react");

var UserProfiles = React.createClass({
  render: function () {
    return (
      <div>
        <p> Username: {this.props.username} </p>
        <p> Bio: {this.props.bio.name} </p>
      </div>  
    )
  }
})

module.exports = UserProfiles;
var React = require("react");

var Notes = React.createClass({
  render: function () {
    return (
      <div>
        <p> {this.props.notes} </p>
      </div>  
    )
  }
});

module.exports = Notes;
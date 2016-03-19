var HelloMessage = React.createClass({
  render: function () {
    return <h1>{this.props.message}!</h1>;
  }
});

// React.render(<HelloMessage message="Hello there" />, document.getElementById("msg"));
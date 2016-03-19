var HelloMessagez11 = React.createClass({
	render: function () {
		return <h1 className={this.props.className}>{this.props.message}</h1>;
	}
});

React.render(<HelloMessagez11 className="textDiv" message="Hello there" />, document.getElementsByClassName("row")[0]);
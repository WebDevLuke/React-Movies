import React from 'react';
import {render} from 'react-dom';
import {findDOMNode} from 'react-dom';

var ErrorBox = React.createClass({
	componentDidUpdate: function(){
		var alertBox = findDOMNode(this.refs.alertBox);
		if(this.props.active){
			$(alertBox).slideDown(250);
		}
		else {
			$(alertBox).slideUp(250);
		}
	},
	render: function(){
		return (
			<div className="alert alert-danger" role="alert" ref="alertBox">{this.props.msg}</div>
		);
	}
});

var MovieForm = React.createClass({
	getInitialState: function() {
		return {
			errorMsg: "No movie or TV show entered!",
			showError: false
		};
	},
	handleSubmit: function(e){
		e.preventDefault();
		if(this.refs.chosenMovie.value !== "") {
			var movieInput = findDOMNode(this.refs.chosenMovie);
			this.props.addMovieFunction(movieInput.value);
			movieInput.value = "";
		}
		else {
			// Show error box
			this.setState({showError: true});
		}	
	},
	handleFocus: function(){
		this.setState({showError: false});
	},
	render: function(){
		return (
			<div className="jumbotron">
				<p>IMDB Movie/TV show search</p> 
				<ErrorBox active={this.state.showError} msg={this.state.errorMsg} />
				<form className="input-group input-group-lg" onSubmit={this.handleSubmit}>
					<input type="text" className="form-control" name="movie-search" placeholder="enter a movie/tv show" onFocus={this.handleFocus} ref="chosenMovie" />
					<span className="input-group-btn">
						<button className="btn btn-default">Search</button>
					</span>
				</form>
			</div>
		);
	}
});

var Movie = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentDidMount: function(){
		var component = this;
		var search = this.props.search.split(' ').join('+');
		$.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&r=json", function(data){
			component.setState(data);
			console.log(data);
		});		
	},
	render: function(){
		return (
			<div className="col-sm-6 col-md-4 movie">
				<div className="thumbnail">
					<img src={this.state.Poster} alt={this.state.Title} />
					<div className="caption">
						<table className="table">
							<tbody>
								<tr>
									<th>Title:</th>
									<td>{this.state.Title}</td>
								</tr>
								<tr>
									<th>Year:</th>
									<td>{this.state.Year}</td>
								</tr>
								<tr>
									<th>Plot:</th>
									<td>{this.state.Plot}</td>
								</tr>
								<tr>
									<th>IMDB rating:</th>
									<td>{this.state.imdbRating}</td>
								</tr>
							</tbody>
						</table>
						<p className="text-center"><a href={"http://www.imdb.com/title/" + this.state.imdbID}  className="btn btn-primary" role="button" target="_blank">View Movie</a></p>
					</div>
				</div>
			</div>
		);
	}
});

var Main = React.createClass({
	getInitialState: function(){
		return {
			movies:[]
		};
	},
	addMovie: function(movieToAdd){
		this.setState({movies: this.state.movies.concat(movieToAdd)});
	},
	render: function(){
		var movies = this.state.movies.map(function(movie, index){
			return (
				<Movie key={index} search={movie} />
			);
		});
		return (
			<div className="container">
				<div className="formControl"><MovieForm addMovieFunction={this.addMovie} /></div>
				<div className="row">
					{movies}
				</div>
			</div>
		);
	}
});

render(<Main />, document.getElementById("app"));
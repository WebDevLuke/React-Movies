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
	handleSubmit: function(e){
		e.preventDefault();
		if(this.refs.chosenMovie.value !== "") {
			var movieInput = findDOMNode(this.refs.chosenMovie);
			this.props.addMovieFunction(movieInput.value);
			movieInput.value = "";
		}
		else {
			// Show error box
			this.props.toggleError(true, "No search term has been entered.");
		}	
	},
	handleFocus: function(){
		this.props.toggleError(false);
	},
	render: function(){
		return (
			<div className="jumbotron">
				<p>IMDB Movie Search</p> 
				<ErrorBox active={this.props.showError} msg={this.props.errorMsg} />
				<form className="input-group input-group-lg" onSubmit={this.handleSubmit}>
					<input type="text" className="form-control" name="movie-search" placeholder="Enter a movie name" onFocus={this.handleFocus} ref="chosenMovie" />
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
	componentWillMount: function(){
		var component = this;
		var search = this.props.search.split(' ').join('+');
		$.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&r=json&type=movie", function(data){
			if(!data.Error) {
				component.setState(data);
				component.setState({test:true});
			}
			else {
				component.props.toggleError(true, "No movie found. Please try a different search term.");
			}
		});		
	},
	render: function(){
		if(this.state.test) {
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
							<p className="text-center"><a href={"http://www.imdb.com/title/" + this.state.imdbID}  className="btn btn-primary" role="button" target="_blank">View Movie</a><span className="btn btn-primary btn-danger" role="button" target="_blank">Remove</span></p>
						</div>
					</div>
				</div>
			);
		}
		else {
			return false;
		}
	}
});

var Main = React.createClass({
	getInitialState: function(){
		return {
			movies:["empire strikes back"],
			showError: false
		};
	},
	addMovie: function(movieToAdd){
		this.setState({movies: this.state.movies.concat(movieToAdd)});
	},
	toggleError: function(show, msg){
		// Called when the API call returns false
		this.setState({
			errorMsg: msg,
			showError: show
		});
	},
	render: function(){
		var component = this;
		var movies = this.state.movies.map(function(movie, index){
			return (
				<Movie key={index} search={movie} toggleError={component.toggleError} />
			);
		});
		return (
			<div className="container">
				<div className="formControl"><MovieForm toggleError={this.toggleError} showError={this.state.showError} errorMsg={this.state.errorMsg} addMovieFunction={this.addMovie} /></div>
				<div className="movies row" >
					{movies}
				</div>
			</div>
		);
	}
});

render(<Main />, document.getElementById("app"));
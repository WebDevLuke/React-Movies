import React from 'react';
import {render} from 'react-dom';

var Movie = React.createClass({

	render: function(){
			return <div className="col-sm-6 col-md-4 movie">
			<div className="thumbnail">
				<img src={this.props.poster} alt={this.props.title} />
				<div className="caption">
					<table className="table">
						<tbody>
							<tr>
								<th>Title:</th>
								<td>{this.props.title}</td>
							</tr>
							<tr>
								<th>Year:</th>
								<td>{this.props.year}</td>
							</tr>
							<tr>
								<th>Plot:</th>
								<td>{this.props.plot}</td>
							</tr>
							<tr>
								<th>IMDB rating:</th>
								<td>{this.props.rating}</td>
							</tr>
						</tbody>
					</table>
					<p className="text-center"><a href="#" className="btn btn-primary" role="button">View Movie</a></p>
				</div>
			</div>
		</div>
	}

});

render(<Movie poster="http://ia.media-imdb.com/images/M/MV5BMjM5OTQ1MTY5Nl5BMl5BanBnXkFtZTgwMjM3NzMxODE@._V1_SX300.jpg" title="Game of Thrones" year="2011 -" plot="While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power. Meanwhile a forgotten race, bent on destruction, return after thousands of years in the North." rating="9.5" />, document.getElementsByClassName("row")[0]);
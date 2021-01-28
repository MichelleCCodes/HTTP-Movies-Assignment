import React from 'react';
import { useHistory } from 'react-router-dom'; 

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
// console.log(props.movie.id)
// console.log(props.match)
// const { id } = props.movie.id;
const { push } = useHistory();

  const handleEditClick = () => {
    push(`/update-movie/${props.movie.id}`);
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default MovieCard;

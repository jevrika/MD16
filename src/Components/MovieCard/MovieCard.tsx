import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './MovieCard.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button/Button';
import { useState } from 'react';
import NotFound from '../../pages/NotFound/NotFound';

type Movie = {
  id: number,
  title: string,
  genre: string,
  rating: number,
  release_year: number,
  director: string,
  budget: number,
  comments: string
}


const MovieCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [inputData, setInputData] = useState<Movie>({ id: 0, title: '', genre: '', rating: 0, release_year: 0, director: '', budget: 0, comments: '' })
  const [isAddingComment, setIsAddingComment] = useState(false);


  const movieQuery = useQuery({
    queryKey: ['movies', id],
    queryFn: () => axios.get<Movie[]>(`http://localhost:3000/movies/${id}`).then((response) => response.data).catch((error) => console.log(error))
  })


  const deleteMovie = useMutation({
    mutationFn: (movieId: number) => axios.delete(`http://localhost:3000/movies/${movieId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(movieQuery)
    }
  })

  const handleDeleteMovie = (movieId: number) => {
    deleteMovie.mutate(movieId);
    navigate('/movies')
  }

  const movieComment = useMutation({
    mutationFn: (movieId: number) => axios.put(`http://localhost:3000/movies/${movieId}`, inputData),
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })

  const handleAddMovieComment = (movieId: number) => {
    movieComment.mutate(movieId)
    setIsAddingComment(false);
  }


  if(movieQuery.isError) {
    return (<div><NotFound/></div>)
  }
  return (
    <>
      <div>
        <div className={styles.wrapper}>
          {movieQuery.data && movieQuery.data.filter((x: Movie) => x.id === Number(id)).map((movie: Movie) => (
            <div key={movie.id} className={styles.movieWrapper}>

              <h1 className={styles.movieTitle} >{movie.title}</h1>
              <h2 className={styles.movieInfoTitle} >Movie release date: <br></br> <span className={styles.movieInfoItem} >{movie.release_year}</span></h2>

              <div className="genreWrapper">
                <h2 className={styles.movieInfoTitle} >Movie genre: <br></br>   <span className={styles.movieInfoItem} >{movie.genre}</span></h2> 
                <img src={`/src/assets/images/${movie.genre.toLowerCase()}.png`} className={styles.genreImage} alt="Genre Image"></img>
              </div>

              <h2 className={styles.movieInfoTitle} >Movie director: <br></br>  <span className={styles.movieInfoItem}>{movie.director}</span></h2>
              <h2 className={styles.movieInfoTitle} >Movie rating: <br></br>  <span className={styles.movieInfoItem}>{movie.rating}</span> </h2>
              <h2 className={styles.movieInfoTitle} >Movie budget: <br></br>  <span className={styles.movieInfoItem} >{movie.budget} $</span></h2>
              <h2 className={styles.movieInfoTitle} >Movie comments: <br></br> <span className={styles.movieInfoItem} >{movie.comments}</span></h2>

              <div className={styles.buttonWrapper}>
                {isAddingComment && (
                  <div className={styles.inputAndButtonWrapper}>
                    <input className={styles.input} placeholder="Enter your comment" onChange={(e) => setInputData({ ...inputData, comments: e.target.value })}></input>
                    <Button buttonText={'Submit'} className={'submitCommentButton'} buttonType={'submit'} onClick={() => handleAddMovieComment(movie.id)} />
                  </div>
                )}
                {!isAddingComment && (
                  <Button buttonText={'Add Comment'} className={'addCommentButton'} buttonType={'button'} onClick={() => setIsAddingComment(true)} />
                )}
                <Button buttonText={'Delete'} className={"deleteButton"} buttonType={"button"} onClick={() => handleDeleteMovie(movie.id)} />
                <Button buttonText={'Go Back'} className={"goBackButton"} buttonType={"button"} onClick={() => navigate(`/movies/`)} />

              </div>
            </div>
          )) || []}
        </div>
      </div>
    </>
  );
}

export default MovieCard;

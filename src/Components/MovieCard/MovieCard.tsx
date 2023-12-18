import styles from './MovieCard.module.css'
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useState } from 'react';
import NotFound from '../../pages/NotFound/NotFound';
import useGetMovie from './hooks/useGetMovie';
import useDeleteMovie from './hooks/useDeleteMovie';
import { Movie } from '../../type';
import useAddMovieComment from './hooks/useAddMovieComment';

const MovieCard = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<Movie>({ id: 0, title: '', genre: '', rating: 0, release_year: 0, director: '', budget: 0, comments: '' })
  const [isInputVisible, setIsInputVisible] = useState(false);


  const { data: movie, isError, isLoading } = useGetMovie()

  const { mutateAsync: deleteMovie } = useDeleteMovie()

  const { mutateAsync: addMovieComment } = useAddMovieComment(setInputData, inputData, setIsInputVisible)

  if (isLoading) {
    return (<div>Loading...</div>)
  }

  if (isError) {
    return (<div><NotFound /></div>)
  }

  if (!movie) {
    return (<div><NotFound /></div>)
  }

  return (
    <>
      <div>
        <div className={styles.wrapper}>
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
              {isInputVisible && (
                <div className={styles.inputAndButtonWrapper}>
                  <input className={styles.input} placeholder="Enter your comment" onChange={(e) => setInputData({ ...inputData, comments: e.target.value })}></input>

                  <Button buttonText={'Submit'} className={'submitCommentButton'} buttonType={'submit'} onClick={() => addMovieComment()} />
                </div>
              )}
              {!isInputVisible && (
                <Button buttonText={'Add Comment'} className={'addCommentButton'} buttonType={'button'} onClick={() => setIsInputVisible(true)} />
              )}
              <Button buttonText={'Delete'} className={"deleteButton"} buttonType={"button"} onClick={() => deleteMovie(movie.id)} />
              <Button buttonText={'Go Back'} className={"goBackButton"} buttonType={"button"} onClick={() => navigate(`/movies/`)} />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;

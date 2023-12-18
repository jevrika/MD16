import styles from './AllMovies.module.css'
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import useGetMovies from "./hooks/useGetMovies";
import NotFound from '../NotFound/NotFound';

const AllMovies = () => {
  const navigate = useNavigate();


  const {data, isLoading, isError} = useGetMovies();

  if(isLoading) {
    return (<div> Loading.... </div>)
  }

  if(isError) {
    return (<NotFound/>)
  }

  if(!data) {
    return (<NotFound/>)
  }

  return (
    <>
      <div>
        <div className={styles.wrapper}>
          {data && data.map((movie) => (
            <div key={movie.id} className={styles.movieWrapper}>
              <h1 className={styles.movieTitle} >{movie.title}</h1>
              <h2 className={styles.movieInfoTitle} >Movie rating: <br></br> <span className={styles.movieInfoItem}>{movie.rating}</span></h2>
              <div className={styles.buttonWrapper}>
                <Button buttonText={"Open"} className={"openButton"} buttonType={"button"} onClick={() => navigate(`/movies/${movie.id}`)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AllMovies;
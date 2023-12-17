import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from './AllMovies.module.css'
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";


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

const AllMovies = () => {
  const navigate = useNavigate();


  const moviesQuery = useQuery({
    queryKey: ['movies'],
    queryFn: () => axios.get<Movie[]>('http://localhost:3000/movies/').then(({data}) => data)
  })

  return (
    <>
      <div>
        <div className={styles.wrapper}>
          {moviesQuery.data && moviesQuery.data.map((movie) => (
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
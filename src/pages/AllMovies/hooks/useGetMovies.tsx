import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Movie } from "../../../type";


const useGetMovies = () => {
  return  useQuery({
    queryKey: ['movies'],
    queryFn: () => axios.get<Movie[]>('http://localhost:3000/movies/').then(({data}) => data)
  })
}

export default useGetMovies

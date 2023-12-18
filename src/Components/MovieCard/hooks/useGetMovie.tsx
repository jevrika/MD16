import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Movie } from "../../../type";

const useGetMovies = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ['movies', id],
    queryFn: () => axios.get<Movie>(`http://localhost:3000/movies/${id}`).then((data) => data.data).catch((error) => console.log(error))
  })
}

export default useGetMovies;
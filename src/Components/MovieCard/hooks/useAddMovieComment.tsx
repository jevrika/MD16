import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Movie } from "../../../type";


const useAddMovieComment = (setInputData ,inputData:Movie, setIsInputVisible)=> {
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => axios.put(`http://localhost:3000/movies/${id}`, inputData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies', id]})
      setInputData({ ...inputData, comments: '' });
      setIsInputVisible(false)
    }
  })
}
 
export default useAddMovieComment;
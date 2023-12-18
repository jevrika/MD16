import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useDeleteMovie = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => axios.delete(`http://localhost:3000/movies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies']})
      navigate('/movies')
    }
  })

}
 
export default useDeleteMovie;
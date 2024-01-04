import { useMutation, useQueryClient } from "@tanstack/react-query";
import {logout as logputApi} from '../../services/apiAuth'
import { useNavigate } from "react-router-dom";

export function useLogout(){
  const queryClient=useQueryClient();
  const navigate=useNavigate()
  const {mutate:logout,isLoading}=useMutation({
    mutationFn: logputApi,
    onSuccess:()=>{
     queryClient.removeQueries()
     navigate('/login',{replace:true})
    }
  })

  return {logout,isLoading}

}
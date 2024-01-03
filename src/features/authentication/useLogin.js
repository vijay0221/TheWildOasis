import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin(){
  const queryClient=useQueryClient();
  const navigate=useNavigate();
  const {mutate:login,isLoading}=useMutation({
    mutationFn:({email,password})=>LoginApi({email,password}),
    onSuccess:(user)=>{
      queryClient.setQueriesData(['user'],user)
      navigate('/dashboard')
    },
    onError:err=>{
      console.log('error ',err);
      toast.error("Provided email or password are incorrect")
    }
  })

  return {login,isLoading}
}
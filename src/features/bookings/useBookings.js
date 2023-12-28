/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings(){
  const queryClient=useQueryClient();

  const [searchParams]=useSearchParams()

  //Filter
  const filterValue=searchParams.get('status');
  const filter= !filterValue||filterValue==='all'?null:{field:'status',value:filterValue}

  //Sort
  const sortByRaw=searchParams.get('sortBy')||'startDate-desc';
  const [field,direction]=sortByRaw.split('-');
  const sortBy={field,direction};

  //Pagination
  const page=!searchParams.get('page')? 1 : Number(searchParams.get('page'));

  //Ouery
   const {isLoading,
    data:{data:bookings,count}={},
    error}=useQuery({
    queryKey:['bookings',sortBy,filter,page],
    queryFn:()=>getBookings({filter,sortBy,page})
   })

  //PreFeteching
  const pageCount=Math.ceil(count/PAGE_SIZE);
  if(page<pageCount){
  queryClient.prefetchQuery({
    queryKey:['bookings',sortBy,filter,page+1],
    queryFn:()=>getBookings({filter,sortBy,page:page+1})
  })
  }

  if(page>1){
    queryClient.prefetchQuery({
      queryKey:['bookings',sortBy,filter,page-1],
      queryFn:()=>getBookings({filter,sortBy,page:page-1})
    })
  }


  return {isLoading,error,bookings,count}
}


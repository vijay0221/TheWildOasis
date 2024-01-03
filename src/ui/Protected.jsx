/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser"
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";


const FullPage = styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;
`

function Protected({children}) {
  const navigate = useNavigate();
  const {isLoading,isAuthenticated}=useUser();

  useEffect(()=>{
   if(!isAuthenticated && !isLoading){
    navigate('/login');
   }
  },[isAuthenticated,navigate,isLoading])

  if(isLoading){
    return <FullPage>
      <Spinner/>
    </FullPage>
  }

  if(isAuthenticated){
    return children
  }
}

export default Protected

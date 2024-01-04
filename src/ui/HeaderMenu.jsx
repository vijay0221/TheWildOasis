import styled from "styled-components"
import LogOut from "../features/authentication/LogOut"
import ButtonIcon from "./ButtonIcon"
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom"
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu=styled.ul`
display: flex;
gap: 0.4rem;
`

function HeaderMenu() {
  const navigate=useNavigate()
  return (
   <StyledHeaderMenu>
   <li>
    <ButtonIcon onClick={()=>navigate('/account')}>
      <AiOutlineUser/>
    </ButtonIcon>
   </li>

   <li>
   <DarkModeToggle/>
   </li>
   
    <li>
      <LogOut/>
    </li>
   </StyledHeaderMenu>
  )
}

export default HeaderMenu

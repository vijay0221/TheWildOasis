import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogOut"
import SpinnerMini from "../../ui/SpinnerMini";
import { BiArrowFromLeft } from "react-icons/bi";

function LogOut() {
  const {logout,isLoading}=useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
    {
        !isLoading ? <BiArrowFromLeft/> :
        <SpinnerMini/>
      
    }
    </ButtonIcon>
  )
}

export default LogOut

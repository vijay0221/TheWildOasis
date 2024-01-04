import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogOut"
import SpinnerMini from "../../ui/SpinnerMini";
import { HiOutlineLogout } from "react-icons/hi";

function LogOut() {
  const {logout,isLoading}=useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
    {
        !isLoading ? <HiOutlineLogout/> :
        <SpinnerMini/>
      
    }
    </ButtonIcon>
  )
}

export default LogOut

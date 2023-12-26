import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";


function AddCabin(){
  return <div>
  <Modal>
     <Modal.Open opens='open-form' >
      <Button> Add new Cabin </Button>
     </Modal.Open>
     <Modal.Window name='open-form'>
      <CreateCabinForm/>
     </Modal.Window>

  </Modal>


  </div>
}

// function AddCabin() {
//   const [isOpenModal, setisOpenModal]=useState(false)

//   return (
//     <div>
//          <Button onClick={()=>setisOpenModal((show)=>!show)}>Add new Cabin</Button>
//       {
//         isOpenModal && <Modal onClose={()=>setisOpenModal(false)}>
//           <CreateCabinForm onCloseModal={()=>setisOpenModal(false)} />
//         </Modal>
//       }
//     </div>
//   )
// }

export default AddCabin

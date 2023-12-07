/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import {useCreateCabin} from './useCreateCabin'
import {useEditCabin} from './useEditCabin'




  
function CreateCabinForm({cabinToEdit={}}) {  
  const {isCreating,createCabin}=useCreateCabin();
  const {isEditing,editCabin}=useEditCabin();
  const isWorking = isCreating || isEditing;

  const {id:editId,...editValues}=cabinToEdit;
  const isEditSession=Boolean(editId)
  const {register,handleSubmit,reset,getValues,formState}= useForm({
    defaultValues:isEditSession?editValues:{}
  });
  const {errors}=formState
  console.log(errors)
  
  function onSubmit(data){  
      const image=typeof data.image==="string"?data.image:data.image[0]
  if(isEditSession) editCabin({newCabinData:{...data,image},id:editId},{onSuccess:(data)=>reset(),});
  else createCabin({...data,image:image},{onSuccess:(data)=>reset(),})
  }

  function onError(errors){
    console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name',{
          required:"This fiels is required"
        })} disabled={isWorking }  />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
         <Input type="number" 
                id="maxCapacity" 
                {...register("maxCapacity",
                            {
                              required:"this field is required",
                              min:{
                                value:1,
                                message:'Capacity should be atleast 1'
                              }
                            })
                
                } disabled={isWorking }/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" 
               id="regularPrice" 
               {...register('regularPrice',
                            {
                              required:"This field is required",
                              min:{
                                value:1,
                                message:'Capacity should be atleast 1'
                              }
                            })
         } disabled={isWorking }/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" 
               id="discount" 
               defaultValue={0} 
               {...register('discount',
                             {
                              required:"this field is required",
                              validate:(value)=>value<=getValues().regularPrice||"Discount should be less than regular price"
                            })
         } disabled={isWorking }/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{
          required:"this field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
       <FileInput id="image" 
                  accept="image"
                  {...register('image',{
                    required: isEditSession?false:"This field is required"
                  })}

        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditSession?"Edit Cabin":"Create new Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

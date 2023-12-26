/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



  
function CreateCabinForm() {
 const queryClient=useQueryClient()
 const {register,handleSubmit,reset,getValues,formState}= useForm();
 const {errors}=formState
console.log(errors)
  const {mutate,isLoading:isCreating}=useMutation({
    mutationFn:createCabin,
    onSuccess:()=>{
      toast.success("new Cabin successfully created")
      queryClient.invalidateQueries({
        queryKey:['cabins']
      
      })
      reset();

    },
    onError:err=>toast.error(err.message)
  })

  function onSubmit(data){
    mutate({...data,image:data.image[0]})
  }

  function onError(errors){
    console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name',{
          required:"This fiels is required"
        })} disabled={isCreating}  />
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
                
                } disabled={isCreating}/>
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
         } disabled={isCreating}/>
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
         } disabled={isCreating}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{
          required:"this field is required"
        })} disabled={isCreating}/>
      </FormRow>

      <FormRow label="Cabin photo">
       <FileInput id="image" 
                  accept="image"
                  {...register('image',{
                    required:"This field is required"
                  })}

        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

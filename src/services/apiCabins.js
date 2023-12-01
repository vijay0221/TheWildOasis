/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase"

export async function getCabins(){
  
const { data,error } = await supabase
.from('cabins')
.select('*')

if(error){
  console.error(error)
  throw new Error("cabins could not be loaded")
}

return data;
}

export async function createEditCabin(newCabin,id){
  const hasImagePath=newCabin.image?.startsWith(supabaseUrl)
  const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll('/','');
  const imagePath= hasImagePath? newCabin.image  :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

//1) Create/Edit Cabin
  let query=supabase.from('cabins')
//A) Create
  if(!id) query.insert([{...newCabin,image:imagePath}])
   
//B) EDit
  if(id) query.update({...newCabin,image:imagePath}).eq("id",id)
   
  const {data,error}= await query.select().single();

  if(error){
  console.error(error)
  throw new Error("cabins could not be created")
  }

// Uploading Image to storage in Supabase
   const {error:storageError}=await supabase.storage.from('cabin-images').upload(imageName,newCabin.image)

// Delete the cabin if there is error in uploading image

   if(storageError){
    await supabase.from('cabins').delete().eq('id', data.id)
  
    console.error(storageError)
    throw new Error("cabin image could not be uploaded and the cabin was not created")
  }

return data;
}

export async function deleteCabin(id){
const {data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)

if(error){
  console.error(error)
  throw new Error("cabins could not be loaded")
}

return data

}
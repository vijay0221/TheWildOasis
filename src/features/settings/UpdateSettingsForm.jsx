/* eslint-disable no-unused-vars */
import { updateSetting } from '../../services/apiSettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import {useSettings} from './useSettings'
import { useUpdateSetting } from './useUpdateSettings';

function UpdateSettingsForm() {

  const {isLoading,settings:{minBookingLength,maxBookingLength,maxGuestPerBooking,breakFastPrice,}={}}=useSettings();

  const {isUpdating,updateSetting}= useUpdateSetting();

  function handleUpdate(e,field){
    const {value}=e.target;
   if(!value)return;
   updateSetting({[field]:value})
  }

  if(isLoading) return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} disabled={isUpdating} onBlur={e=>handleUpdate(e,'minBookingLength')} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} disabled={isUpdating} onBlur={e=>handleUpdate(e,'maxBookingLength')} />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestPerBooking} disabled={isUpdating} onBlur={e=>handleUpdate(e,'maxGuestPerBooking')} />
      </FormRow>

    
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakFastPrice} disabled={isUpdating} onBlur={e=>handleUpdate(e,'breakFastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

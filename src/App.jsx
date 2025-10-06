import { useState } from 'react';
import './App.css';
import FormSubmit from './formSubmit';
import IconCheckboxCheck from './icons/IconCheckboxCheck';
import IconRadioSelected from './icons/IconRadioSelected';
import IconSuccessCheck from './icons/IconSuccessCheck';
import SuccessMessage from './SuccessMessage';
export default function App() {
  const [successMessage, setSuccessMessage]=useState(false);
  
  return (
    <>
  <div className='bg-green-200 lg:h-screen'>
     
     <div className='flex flex-col justify-center align-middle items-center '>
      <div>
         {
        successMessage && <SuccessMessage />
      }
      </div>
     <FormSubmit successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
   </div>
  </div>
    </>
    
  );
}

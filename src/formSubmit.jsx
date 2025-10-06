import { useState } from "react";
import InputForm from "./InputForm";

export default function FormSubmit({setSuccessMessage, successMessage}) {
  const [errors, setErrors]=useState({})
  const [isDisabled, setIsDisabled]=useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    quertype: "",
    rules: false,
  });
  

  function queryBackroundGeneralHandler() {
    setValues({ ...values, quertype: "general" });
  }
  function queryBackroundSupportHandler() {
    setValues({ ...values, quertype: "support" });
  }

  function submitHandler(e) {
   e.preventDefault();
   let error={};
   if(!successMessage){
       if (values.firstName==="" || !values.firstName.trim()) {
        error.firstName="this field is required";
        setSuccessMessage(false);
   }
   if (values.lastName==="" || !values.lastName.trim()) {
        error.lastName="this field is reqired";
   }

    if (values.email === "" || !values.email.trim()) {
      error.email = "This field is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        error.email = "Please enter a valid email address";
      }
    }
   if (values.quertype==="") {
        error.quertype="Please select a query type";
   }

   if (values.message==="" || !values.message.trim()) {
        error.message="this field is required";
   }

   if (!values.rules) {
       error.rules="To submit this form, please consent ot bieng contacted ";
   }
   if(Object.keys(error).length){
        setErrors(error);
   }else{
       setErrors({});
       setValues({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        quertype: "",
        rules: false,
      });
       setSuccessMessage(true);  
       setIsDisabled(true)
   }
   
   }
  }

  return (
     
     <form
      onSubmit={submitHandler}
      className={`rounded-lg max-lg:mb-10 bg-white w-5/12 p-4   max-md:w-11/12  ${ successMessage?"max-md:mt-2 mt-0":"max-md:mt-6 mt-14"}`}
    >
      <div className="flex justify-between gap-x-3 max-sm:gap-y-2 max-md:flex-col">
        <InputForm
          setValues={setValues}
          values={values}
          typeInput="text"
          isDisabled={isDisabled}
          name="firstName"
          errorMessage={errors.firstName}
        />
        <InputForm
          setValues={setValues}
          values={values}
           isDisabled={isDisabled}
          typeInput="text"
          name="lastName"
           errorMessage={errors.lastName}
        />
      </div>

      <div className="pt-2">
        <InputForm
          setValues={setValues}
           isDisabled={isDisabled}
          values={values}
          typeInput="email"
          name="email"
           errorMessage={errors.email}
        />
      </div>

      <div className="flex flex-col text-sm pt-2 ">
        <label className="font-worksans font-bold"> Query Type <span className="text-green-600 text-sm">*</span></label>
        <div className="flex justify-between gap-4 mt-1 max-md:flex-col">
          <div
                className={`w-full flex p-1 rounded-md border ${
                values.quertype==="general" ? "bg-green-100 border-green-600" : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="query_type"
                  disabled={isDisabled}
                  id="general"
                  onClick={queryBackroundGeneralHandler}
                />
              <label htmlFor="general" className="w-full text-center"> General Enquiry</label>
          </div>

          <div
            className={`w-full flex p-1 rounded-md border ${
              values.quertype==="support" ? "bg-green-100 border-green-600" : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="query_type"
                 disabled={isDisabled}
              id="support"
              onClick={queryBackroundSupportHandler}
            />
            <label htmlFor="support" className="w-full text-center">
              Support Request
            </label>
          </div>
        </div>
       <div className="text-red-600 text-sm"> {errors.quertype
        }</div>
      </div>

      <div className={`flex flex-col ${errors.message ? "mt-1 mb-2": "mt-4 mb-6"} `}>
        <label className="text-sm">
          Message <span className="text-green-600">*</span>
        </label>
        <textarea
          name="message"
          value={values.message}
             disabled={isDisabled}
          onChange={(e) =>
            setValues({ ...values, message: e.target.value })
          }
          className={`rounded-md border  outline-green-600 p-1 ${errors.message?"border-red-600":"border-gray-200"} `}
          rows={2}
        ></textarea>
       <div className="text-red-600 text-sm">{errors.message}</div>
      </div>

      <div className={`${errors.rules?"mt-2 mb-1":" mt-4 mb-3 "}`}>
        <div>
          <input
            type="checkbox"
            checked={values.rules}
               disabled={isDisabled}
            onChange={(e) =>
              setValues({ ...values, rules: e.target.checked })
            }
          />
          <label className="ps-2 text-sm">
            I hereby consent to being contacted by the team
          </label>
        </div>

        {!values.rules && (
          <div className="text-red-600 text-sm">
            {errors.rules}
          </div>
        )}
      </div>

      <button className="w-full bg-green-600 mt-3 rounded-md py-1 hover:bg-green-900 text-white">
        Submit
      </button>
    </form>
  );
}

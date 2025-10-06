function InputForm({ name, values, errorMessage, typeInput, setValues,isDisabled }) {
  return (
    <div className={`flex flex-col text-sm w-full ${errorMessage?"mb-0":"mb-3"}`}>
      <label htmlFor={name} className="capitalize font-bold font-worksans">
        {name} <span className="ps-1 text-green-600 text-sm">*</span>
      </label>
      <input
        type={typeInput}
        disabled={isDisabled}
        name={name}
        value={values[name]}
        onChange={(e) => setValues({ ...values, [name]: e.target.value })}
        className={`w-full border  rounded-md px-4 py-1 outline-green-600  ${errorMessage?"border-red-600 mt-0":"border-gray-200"} `}
      />
      <div className="text-red-600 text-sm">{errorMessage}</div>
    </div>
  );
}

export default InputForm;

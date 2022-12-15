export default function InputCustom({
   type = 'text',
   label = '',
   defaultValue = '',
   onChange = () => {},
   props,
}: any) {
   return (
      <div>
         <label>{label}</label>
         <input
            type={type}
            defaultValue={defaultValue}
            className='w-full border-2 px-2 py-1 rounded-md'
            onChange={onChange}
            {...props}
         />
      </div>
   );
}

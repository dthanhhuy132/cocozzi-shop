interface ILoginValidtionText {
   warningText: string;
   isError?: boolean;
}

export default function WarningText({warningText, isError = false}: ILoginValidtionText) {
   return (
      <p className={`text-white ${isError ? 'text-[1rem] italic' : 'text-[0.8rem]'} font-thin`}>
         * {warningText}
      </p>
   );
}

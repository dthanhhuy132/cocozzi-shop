interface IButton {
   children?: any;
   className?: string;
   click: (e: any) => void;
}

export default function AdminButton({children = '', className = '', click = () => {}}: IButton) {
   return (
      <button
         onClick={click}
         className={` flex items-center gap-1 bg-blue-700 hover:bg-blue-600 text-white px-2 py-2 border-1px rounded-lg ${className}`}>
         {children}
      </button>
   );
}

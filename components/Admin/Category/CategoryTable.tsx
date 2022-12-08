import {useState, useEffect} from 'react';
import AdminModal from '../AdminModal';
import CategoryTableHeader from './CategoryTableHeader';
import Dropdown from 'react-dropdown';

const options = ['active', 'disable'];

export default function CategoryTable({categoryList}: any) {
   const [isEdit, setIsEdit] = useState(false);
   const [editItem, setEditItem] = useState(null);
   const [categoryEditData, setCategoryEditData] = useState(null);

   function handleOnclickCategoryOption(categoryItem) {
      console.log('categoryItem', categoryItem);

      setEditItem(categoryItem);
      setIsEdit(!isEdit);
   }

   function handleUpdateCategory() {
      const newCategoryItem = {
         name: editItem.name,
         status: editItem.status,
      };
      console.log('editItem co gi la hong', newCategoryItem);
      console.log('_id cho nay la gi', editItem._id);
   }

   useEffect(() => {
      if (!isEdit) {
         setEditItem(null);
      }
   }, [isEdit]);

   return (
      <div className='container w-[50%] px-8'>
         <div className=''>
            <h2 className='text-2xl font-semibold'>Category list</h2>
            <div className='-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto'>
               <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
                  <table className='min-w-full leading-normal'>
                     <CategoryTableHeader />
                     <tbody>
                        {categoryList.map((categoryItem) => (
                           <tr key={categoryItem._id}>
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                 <div>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                       {categoryItem.name}
                                    </p>
                                 </div>
                              </td>

                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                 <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                                    <span
                                       aria-hidden
                                       className='absolute inset-0 bg-green-400 opacity-50 rounded-full'
                                    />
                                    <span className='px-2'>
                                       {categoryItem.status ? 'active' : 'disabled'}
                                    </span>
                                 </span>
                              </td>
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-right'>
                                 <button
                                    data-tooltip-target='tooltip-light'
                                    data-tooltip-style='light'
                                    type='button'
                                    onClick={() => handleOnclickCategoryOption(categoryItem)}
                                    className='text-white bg-black hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                                    Edit
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         {isEdit && editItem && (
            <AdminModal
               ok={handleUpdateCategory}
               cancel={() => setIsEdit(false)}
               title='Edit category'>
               <div>
                  <table className='min-w-full leading-normal'>
                     <CategoryTableHeader isShow3Col={false} />
                     <tbody>
                        <tr className=''>
                           <td className='py-5 border-b border-gray-200 bg-white text-sm'>
                              <input
                                 type='text'
                                 defaultValue={editItem?.name}
                                 className='w-full border-2 px-5 py-2 rounded-xl'
                                 onChange={(e) => setEditItem({...editItem, name: e.target.value})}
                              />
                           </td>

                           <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <Dropdown
                                 options={options}
                                 onChange={(e) =>
                                    setEditItem({
                                       ...editItem,
                                       status: e.value === options[0] ? true : false,
                                    })
                                 }
                                 value={editItem.status ? options[0] : options[1]}
                                 placeholder='Select an option'
                              />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </AdminModal>
         )}
      </div>
   );
}

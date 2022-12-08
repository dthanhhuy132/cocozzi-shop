import {AdminLayout, CategoryTable} from '../../components/Admin';
import categoryApi from '../../service/categoryApi';

export default function Category({categoryList}) {
   console.log('all category cho nay la gi', categoryList);
   return (
      <AdminLayout>
         <CategoryTable categoryList={categoryList}></CategoryTable>
      </AdminLayout>
   );
}

export const getServerSideProps = async () => {
   const categoryRes = await categoryApi.getAllCategory();

   return {
      props: {
         categoryList: categoryRes.data.data || [],
      },
   };
};

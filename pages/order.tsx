import {useState, useMemo, useEffect} from 'react';
import ProductOrderItem from '../components/ProductOrder/ProductOrderItem';

import {getTokenSSRAndCSS} from '../helper';
import FormatPrice from '../helper/FormatPrice';
import paymentApi from '../service/paymentApi';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {useAppDispatch} from '../store';
import moment from 'moment';
import {deletePaymentAsync} from '../store/payment/paymentAsynAction';
import {MdOutlineDone} from 'react-icons/md';
import {GrFormClose} from 'react-icons/gr';
import ProductOrder from '../components/ProductOrder/ProductOrder';

export default function MyOrderPage({paymentList}) {
   console.log('paymentList', paymentList);
   const router = useRouter();
   const accessToken = Cookies.get('accessToken');

   // isloading
   // confirm delete modal

   const [renderPayment, setRenderPayment] = useState(paymentList);

   useEffect(() => {
      if (!accessToken) {
         router.push('/membership');
         toast.warning('Vui lòng đăng nhập để xem đơn hàng');
      }
   }, []);

   return (
      <div className='flex flex-col gap-5 py-2 px-2 w-full md:w-1/2 md:mx-auto mb-2'>
         <h2 className='font-bold text-[2rem]'>Thông tin đơn hàng</h2>

         {renderPayment.length > 0 ? (
            paymentList.map((payment, index) => {
               return <ProductOrder payment={payment} key={payment._id} index={index} />;
            })
         ) : (
            <p>Chưa có đơn hàng nào</p>
         )}
      </div>
   );
}

export const getServerSideProps = async (context: any) => {
   let paymentList;
   const [token, userToken] = getTokenSSRAndCSS(context);
   const userId = userToken?.data._id;
   console.log(token, userId);
   try {
      if (token && userId) {
         const paymentRes = await paymentApi.getPaymentByUser(token, userId);

         paymentList = paymentRes?.data?.data;
         console.log('paymentList', paymentList);
      }
   } catch (error) {}

   return {
      props: {
         ok: true,
         paymentList: paymentList || [],
      },
   };
};

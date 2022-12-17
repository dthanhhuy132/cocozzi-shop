import Select from 'react-select';
import React, {useEffect, useState} from 'react';

import PaymetnInputForm from './PaymentInputForm';
import {address} from './address/address';
import {province} from './address/province';

export default function PaymentAddress() {
   const formatProvince = province.map((item) => ({value: item, label: item}));
   const [initProvince, setProvince] = useState('Thành phố Hồ Chí Minh');
   const [districtName, setDistrictName] = useState('');
   const [district, setDistrict] = useState([]);

   function getAndFormatDistrict() {
      const districtList = address.filter((x) => x.province === initProvince)[0].districtsArr;

      return districtList.map((item) => ({value: item, label: item}));
   }

   useEffect(() => {
      const newDistrictList = getAndFormatDistrict();
      setDistrict(newDistrictList);
   }, [initProvince]);
   return (
      <div className='flex gap-3 flex-col mb-5'>
         <div className='flex flex-col md:flex-row justify-between gap-5'>
            <div className='md:w-[50%]'>
               <label className='font-semibold'>Tỉnh/Thành phố *</label>
               <Select
                  placeholder='Chọn Tỉnh/Thành phố'
                  defaultInputValue={initProvince}
                  name='Provice'
                  options={formatProvince}
                  onChange={(e) => setProvince(e.value)}
               />
            </div>

            <div className='md:w-[50%]'>
               <label className='font-semibold'>Quận/Huyện *</label>
               <Select
                  placeholder='Chọn Quận/Huyện'
                  options={district}
                  onChange={(e) => setDistrictName(e.value)}
               />
            </div>
         </div>

         <PaymetnInputForm label='Địa chỉ' placeHolder='Địa chỉ cụ thể' />
      </div>
   );
}

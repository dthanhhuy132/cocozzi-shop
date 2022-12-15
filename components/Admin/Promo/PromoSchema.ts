import * as Yup from 'yup';

const validateEventForPromoSchema = {
   title: Yup.string().required('Vui lòng nhập title!'),
   startDate: Yup.date()
      .required('Vui lòng nhập thời gian bắt đầu cho event')
      .min(new Date(), 'Please choose future date'),
   endDate: Yup.date()
      .required('Vui lòng nhập thời gian kết thúc cho event')
      .test('same_dates_test', 'Start and end dates must not be equal.', function (value) {
         const {startDate} = this.parent;
         return value.getTime() !== startDate.getTime();
      }),
   percent: Yup.number().required('vui lòng nhập phần trăm giảm giá cho Event'),
   status: Yup.boolean().required('Vui lòng chọn status cho event'),
   images: Yup.mixed().required('Images is required'),
};

export default validateEventForPromoSchema;

import {useEffect} from 'react';
import {useRouter} from 'next/router';

import {GetStaticProps, GetStaticPaths, GetServerSideProps} from 'next';

export default function SearchPage() {
   const router = useRouter();
   const searchStr = router.query.q;

   useEffect(() => {
      if (!searchStr) {
         router.push('/');
      }
   }, [searchStr]);

   return <div>this is search page</div>;
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
   const query = context.query.q || '';

   console.log('query search page la gi', query);
   try {
      let listProductSearch = [];
      return {
         props: {
            listProductSearch,
            error: false,
         },
      };
   } catch (error) {
      return {
         props: {
            error: true,
         },
      };
   }
};

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/image-gallery.css';
import '../styles/slick.css';
import '../styles/globals.css';

import Head from 'next/head';
import {Header} from '../components/Header';

function MyApp({Component, pageProps}) {
   return (
      <>
         <Head>
            <title>Cocozzi</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <Header></Header>
         <Component {...pageProps} />
      </>
   );
}

export default MyApp;

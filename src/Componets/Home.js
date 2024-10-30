import React from 'react';

import { Link } from 'react-router-dom';

import pricebook2Image from '../Images/metromart-pickaroo-grab-min.jpg';
import pricebook3Image from '../Images/lazada-only-min.png';
import pricebook4Image from '../Images/snr-min.png';
import pricebook5Image from '../Images/shopee-min.png';
import pluextImage from '../Images/pluext_snap-min.png';

function Home() {

    React.useEffect(() =>{
        document.title = 'Ecommerce Maintenance 👀';
    }, []);

  return (
  <main className='bg-gray-200'>
      <div className='container mx-auto h-screen'>
        <div className='flex h-screen'>
            <div className='m-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-center justify-items-stretch gap-5'>
                
                    <div className='bg-white relative overflow-hidden rounded-md border shadow-lg hover:scale-110 hover:shadow-xl'>
                        <img src={pricebook2Image} className='w-full' style={{ height: '225px', objectFit: 'cover'}}/>
                        <div className='m-5'>
                            <h5 className='text-xl font-semibold text-slate-700'>Pricebook 2</h5>
                            <p className='mt-3 mb-3 text-xs font-semibold text-slate-700'>
                                <span className='py-1 px-2 mx-1 bg-yellow-300 rounded-full'>Metro Mart</span>
                                <span className='py-1 px-2 mx-1 bg-yellow-300 rounded-full'>Pick A Roo</span>
                                <span className='py-1 px-2 mx-1 bg-yellow-300 rounded-full'>Grab Mart</span>
                                <span className='py-1 px-2 mx-1 bg-yellow-300 rounded-full'>Panda Mart</span>
                            </p><br/>
                            <Link to='/pricebook2' className='rounded border-solid border px-3 py-2 after:absolute after:inset-0'>View</Link>
                        </div>
                    </div>
                    
                    <div className='bg-white relative overflow-hidden rounded-md border shadow-lg hover:scale-110 hover:shadow-xl'>
                        <img src={pricebook3Image} className='w-full' style={{ height: '225px', objectFit: 'cover'}}/>
                        <div className='m-5'>
                            <h5 className='text-xl font-semibold text-slate-700'>Pricebook 3</h5>
                            <p className='mt-3 mb-3 text-xs font-semibold text-slate-700'>
                                <span className='py-1 px-2 mx-1 bg-yellow-300 rounded-full'>Lazada</span>
                            </p><br/>
                            <Link to='/pricebook3' className='rounded border-solid border px-3 py-2 after:absolute after:inset-0'>View</Link>
                        </div>
                    </div>

                    <div className='bg-white relative overflow-hidden rounded-md border shadow-lg hover:scale-110 hover:shadow-xl'>
                        <img src={pricebook4Image} className='w-full' style={{ height: '225px', objectFit: 'cover'}}/>
                        <div className='m-5'>
                            <h5 className='text-xl font-semibold text-slate-700'>Pricebook 4</h5>
                            <p className='mt-3 mb-3 text-xs font-semibold text-slate-700'>
                                <span className='py-1 px-2 mx-1 bg-yellow-300 rounded-full'>S&R Online Store</span>
                            </p><br/>
                            <Link to='/pricebook4' className='rounded border-solid border px-3 py-2 after:absolute after:inset-0'>View</Link>
                        </div>
                    </div>

                    <div className='bg-white relative overflow-hidden rounded-md border shadow-lg hover:scale-110 hover:shadow-xl'>
                        <img src={pricebook5Image} className='w-full' style={{ height: '225px', objectFit: 'cover'}}/>
                        <div className='m-5'>
                            <h5 className='text-xl font-semibold text-slate-700'>Pricebook 5</h5>
                            <p className='mt-3 mb-3 text-xs font-semibold text-slate-700'>
                                <span className='py-1 px-2 mx-1 bg-yellow-300 rounded-full'>Shopee</span>
                            </p><br/>
                            <Link to='/pricebook5' className='rounded border-solid border px-3 py-2 after:absolute after:inset-0'>View</Link>
                        </div>
                    </div>
                    
                    <div className='bg-white relative overflow-hidden rounded-md border shadow-lg hover:scale-110 hover:shadow-xl'>
                        <img src={pluextImage} className='w-full' style={{ height: '225px', objectFit: 'cover'}}/>
                        <div className='m-5'>
                            <h5 className='text-xl font-semibold text-slate-700'>Pluext</h5>
                            <p className='mt-3 mb-3 text-xs font-semibold text-slate-700'>
                                Download Plu extension for loading price updates to Pos
                            </p><br/>
                            <a href='http://199.84.1.34:333/' target='_blank' className='rounded border-solid border px-3 py-2 after:absolute after:inset-0'>View</a>
                        </div>
                    </div>
                    
                
                </div>
            </div>
        </div>
    </div>
  </main>
    );
}

export default Home;

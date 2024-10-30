import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../Layout/DefaultLayout.css';
import { DownloadsProvider } from '../../context/DownloadsContext';
import DownloadsContainer from '../DownloadsContainer';

function DefaultLayout() {
    return (
        <>
            <DownloadsProvider>
            <div style={{boxShadow: 'inset 0 20px 20px -20px rgb(0 0 0 / 40%)'}}>
                <nav>
                    <div className='container mx-auto'>
                        <div className='flex items-center flex-wrap p-6'>
                            <div className="flex items-center flex-shrink-0 mr-6 ">
                                <Link to='/' className='text-2xl font-semibold tracking-tight hover:-translate-y-1'>Ecommerce Center</Link>
                            </div>
                            <div className='flex items-center flex-wrap p-4'>
                                <Link to='/pricebook2' className='px-3 py-1 inline-block hover:-translate-y-1'>Pricebook 2</Link>
                                <Link to='/pricebook3' className='px-3 py-1 inline-block hover:-translate-y-1'>Pricebook 3</Link>
                                <Link to='/pricebook4' className='px-3 py-1 inline-block hover:-translate-y-1'>Pricebook 4</Link>
                                <Link to='/pricebook5' className='px-3 py-1 inline-block hover:-translate-y-1'>Pricebook 5</Link>
                                <a href='http://199.84.1.34:333/' target='_blank' className='px-3 py-1 inline-block hover:-translate-y-1'>Pluext</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div>
                    <Outlet/>
                    
                </div>
                <DownloadsContainer />
            </div>
            </DownloadsProvider>
        </>
        
    )
}

export default DefaultLayout;
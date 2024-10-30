import React from 'react';
import ProductsTable from './Pricebook2/ProductsTable';
import ProductsUpdate from './Pricebook2/ProductsUpdate';
import PriceChangesTable from './Pricebook2/PriceChangesTable';

function Pricebook2() {

    React.useEffect(function(){
        document.title = 'Pricebook 2';
    }, []);

  return (
    <div className='min-h-screen pb-10 grid grid-cols-12 relative'>
        <nav className='hidden md:block col-span-3 lg:col-span-2 '>
        </nav>
        <main className='col-span-full md:col-span-9 lg:col-span-8 container mx-auto mt-32 bg-white border border-gray-50 shadow-lg p-5 rounded'>
          <h1 className='text-3xl font-semibold mb-2'>Pricebook 2</h1>
          <p className='text-slate-500'>MetroMart, PickARoo, GrabMart, and PandaMart</p>

          <section className='mt-10'>
            <ProductsTable/>
          </section>
          <section className='mt-10'>
            <ProductsUpdate/>
          </section>
          <section>
            <PriceChangesTable/>
          </section>
        </main>
    </div>
  );
}

export default Pricebook2;

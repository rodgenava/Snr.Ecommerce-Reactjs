import React from 'react';
import ProductsTable from './Pricebook5/ProductsTable';
import ProductsUpdate from './Pricebook5/ProductsUpdate';
import PromotionsTable from './Pricebook5/PromotionsTable';
import PromotionsUpdate from './Pricebook5/PromotionsUpdate';
import PriceChangesTable from './Pricebook5/PriceChangesTable';

function Pricebook5() {

    React.useEffect(function(){
        document.title = 'Pricebook 5';
    }, []);

  return (
      <div className='min-h-screen pb-10 grid grid-cols-12'>
        <nav className='hidden md:block col-span-3 lg:col-span-2 '>
        </nav>
          <main className='col-span-full md:col-span-9 lg:col-span-8 container mx-auto mt-32 bg-white border border-gray-50 shadow-lg p-5 rounded'>
              <h1 className='text-3xl font-semibold mb-2'>Pricebook 5</h1>
              <p className='text-slate-500'>Shopee</p>

              <section className='mt-10'>
                <ProductsTable/>
              </section>
              <section className='mt-10'>
                <ProductsUpdate/>
              </section>
              <section className='mt-10'>
                <PromotionsTable/>
              </section>
              <section className='mt-10'>
                <PromotionsUpdate/>
              </section>
              <section className='mt-10'>
                <PriceChangesTable/>
              </section>
          </main>
      </div>
  );
}

export default Pricebook5;

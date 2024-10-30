import React from 'react';
import ProductsTable from './Pricebook3/ProductsTable';
import ProductsUpdate from './Pricebook3/ProductsUpdate';
import PriceChangesTable from './Pricebook3/PriceChangesTable';
import PromotionsTable from './Pricebook3/PromotionsTable';
import PromotionsUpdate from './Pricebook3/PromotionsUpdate';


function Pricebook3() {

    React.useEffect(function(){
        document.title = 'Pricebook 3';
    }, []);

  return (
      <div className='min-h-screen pb-10 grid grid-cols-12'>
        <nav className='hidden md:block col-span-3 lg:col-span-2 '>
        </nav>
        <main className='col-span-full md:col-span-9 lg:col-span-8 container mx-auto mt-32 bg-white border border-gray-50 shadow-lg p-5 rounded'>
          <h1 className='text-3xl font-semibold mb-2'>Pricebook 3</h1>
          <p className='text-slate-500'>Lazada</p>

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

export default Pricebook3;

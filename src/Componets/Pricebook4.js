import React from 'react';
import ProductsTable from './Pricebook4/ProductsTable';
import ProductsUpdate from './Pricebook4/ProductsUpdate';
import PriceChangesTable from './Pricebook4/PriceChangesTable';
import PromotionsTable from './Pricebook4/PromotionsTable';
import PromotionsUpdate from './Pricebook4/PromotionsUpdate';
import WeightedItemsTable from './Pricebook4/WeightedItemsTable';
import WeightedSkusUpdate from './Pricebook4/WeightedSkusUpdate';

function Pricebook4() {

  React.useEffect(function () {
    document.title = 'Pricebook 4';
  }, []);

  return (
      <div className='min-h-screen pb-10 grid grid-cols-12'>
        <nav className='hidden md:block col-span-3 lg:col-span-2 '>
        </nav>
          <main className='col-span-full md:col-span-9 lg:col-span-8 container mx-auto mt-32 bg-white border border-gray-50 shadow-lg p-5 rounded'>
            <h1 className='text-3xl font-semibold mb-2'>Pricebook 4</h1>
            <p className='text-slate-500'>S&R Online Store</p>

            <article className='mt-10'>
              <ProductsTable />
            </article>
            <article className='mt-10'>
              <ProductsUpdate />
            </article>
            <article className='mt-10'>
              <PromotionsTable />
            </article>
            <article className='mt-10'>
              <PromotionsUpdate />
            </article>
            <article className='mt-10'>
              <WeightedItemsTable />
            </article>
            <article className='mt-10'>
              <WeightedSkusUpdate />
            </article>
            <article className='mt-10'>
              <PriceChangesTable />
            </article>
          </main>
      </div>
  );
}

export default Pricebook4;

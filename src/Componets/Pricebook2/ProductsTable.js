import React, { useState, useRef, useCallback } from 'react';
import useProductsDataSource from './useProductsDataSource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import '../Pricebook2.css';

function ProductsTable() {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [searchTerm, setSearchTerm] = useState('');
    const { error, isBusy, products, hasMore } = useProductsDataSource(currentPage, pageSize, searchTerm);

    const observer = useRef();

    const lastElement = useCallback(node =>{
        if(!isBusy && hasMore){
            if(observer.current){
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting){
                    setCurrentPage(prevPage => prevPage + 1);
                }
            });
            if(node){
                observer.current.observe(node);
            }
        }
    }, [isBusy, hasMore]);

    function onSearchInputChanged(event){
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    }

  return (
    <section>
        <h5 id='productsTableHeader' className='font-semibold mb-5'>Enrolled Skus</h5>
        
        <div className='flex border-solid border border-gray-300 rounded-md mb-10 overflow-hidden'>
            <div className='bg-gray-300 py-2 px-3'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='inline-block my-auto' />
            </div>
        
            <input 
                className='appearance-none w-full block p-2'
                type='search'
                value={searchTerm}
                onChange={onSearchInputChanged}
                placeholder='Search by Sku, Description, Class, or Department...' />
        </div>
        
        <div style={{ maxHeight: '50em', overflowY: 'auto' }} className='border rounded-lg overflow-hidden'>
            <table>
                <thead>
                    <tr>
                        <th className='font-medium text-left'>Sku</th>
                        <th className='font-medium text-left'>Description</th>
                        <th className='font-medium text-left'>Class</th>
                        <th className='font-medium text-left'>Subclass</th>
                        <th className='font-medium text-left'>Department</th>
                        <th className='font-medium text-left'>Subdepartment</th>
                        <th className='font-medium text-left'>Sku Type Code</th>
                        <th className='font-medium text-left'>MMS Status</th>
                    </tr>
                </thead>
                <tbody>
                {products.length > 0 ? products.map((item, index) => {
                        if(index + 1 !== products.length){
                            return <tr key={item.sku}>
                                        <td>{item.sku}</td>
                                        <td>{item.description}</td>
                                        <td>{item.class}</td>
                                        <td>{item.subclass}</td>
                                        <td>{item.department}</td>
                                        <td>{item.subdepartment}</td>
                                        <td>{item.skuTypeCode}</td>
                                        <td>{item.mmsStatus}</td>
                                    </tr>;
                        }else{
                            return <tr ref={lastElement} key={item.sku}>
                                        <td>{item.sku}</td>
                                        <td>{item.description}</td>
                                        <td>{item.class}</td>
                                        <td>{item.subclass}</td>
                                        <td>{item.department}</td>
                                        <td>{item.subdepartment}</td>
                                        <td>{item.skuTypeCode}</td>
                                        <td>{item.mmsStatus}</td>
                                    </tr>;
                        }
                    
                    }) : error === null && !isBusy && <tr><td colSpan='8' className='text-center'>No results</td></tr> }
                { error && !isBusy && <tr><td colSpan='8' className='text-center'>An error occurred:(</td></tr> }
                { !isBusy && !hasMore && products.length !== 0 && <tr><td colSpan='8' className='text-center'>End of results.</td></tr> }
                { isBusy && (
                <><tr className='animate-pulse'>
                            
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                        </tr>
                        <tr className='animate-pulse'>
                            
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                        </tr>
                        <tr className='animate-pulse'>
                            
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                                        <td><div className='w-full h-5 rounded bg-slate-300'></div></td>
                        </tr>
                        </>) }
                </tbody>
            </table>
        </div>
    </section>
  );
}

export default ProductsTable;

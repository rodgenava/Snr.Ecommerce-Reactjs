import React, { useState, useRef, useCallback } from 'react';
import usePromotionsDataSource from './usePromotionsDataSource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import '../Pricebook3.css';
import {formatWithThousandSeparator} from '../../numberutil';
import { month } from '../../dateutil';

function PromotionsTable() {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [searchTerm, setSearchTerm] = useState('');
    const { error, isBusy, items, hasMore } = usePromotionsDataSource(currentPage, pageSize, searchTerm);

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

    const formatDate = function(date){
        const d = new Date(date);
        return `${month.getShortName(d.getMonth())} ${d.getDate()}, ${d.getFullYear()}`;
    }

  return (
    <section>
        <h5 className='font-semibold mb-5'>Promotions</h5>
        
        <div className='flex border-solid border border-gray-300 rounded-md mb-10 overflow-hidden'>
            <div className='bg-gray-300 py-2 px-3'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='inline-block my-auto' />
            </div>
        
            <input 
                className='appearance-none w-full block p-2'
                type='search'
                value={searchTerm}
                onChange={onSearchInputChanged}
                placeholder='Search by Sku or Store...' />
        </div>
        
        <div style={{ maxHeight: '50em', overflowY: 'auto' }} className='border rounded-lg overflow-hidden'>
            <table>
                <thead>
                    <tr>
                        <th className='font-medium text-left'>Store</th>
                        <th className='font-medium text-left'>Sku</th>
                        <th className='font-medium text-left'>Description</th>
                        <th className='font-medium text-right'>Highest Cost</th>
                        <th className='font-medium text-right'>Highest Regular Price</th>
                        <th className='font-medium text-right'>Event Number</th>
                        <th className='font-medium text-right'>Price</th>
                        <th className='font-medium text-right'>Margin %</th>
                        <th className='font-medium text-right'>Price Difference %</th>
                        <th className='font-medium text-right'>Begin</th>
                        <th className='font-medium text-right'>End</th>
                        <th className='font-medium text-left'>Applied</th>
                    </tr>
                </thead>
                <tbody>
                {items.length > 0 ? items.map((item, index) => {
                    if(index + 1 !== items.length){
                        return (<tr key={`${item.eventNumber}${item.store}${item.sku}`}>
                                    <td>{item.store}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.description}</td>
                                    <td className='text-right'>{item.highestCost !== null && formatWithThousandSeparator(item.highestCost.toFixed(2))}</td>
                                    <td className='text-right'>{formatWithThousandSeparator(item.highestRegularPrice.toFixed(2))}</td>
                                    <td className='text-right'>{item.eventNumber}</td>
                                    <td className='text-right'>{formatWithThousandSeparator(item.promoPrice.toFixed(2))}</td>
                                    <td className='text-right'>{item.margin !== null && formatWithThousandSeparator(item.margin.toFixed(2))}</td>
                                    <td className='text-right'>{formatWithThousandSeparator(item.priceDifference.toFixed(2))}</td>
                                    <td className='text-left'>{formatDate(item.eventBegin)}</td>
                                    <td className='text-left'>{formatDate(item.eventEnd)}</td>
                                    <td>{item.apply ? 'Yes' : 'No'}</td>
                                </tr>);
                    }else{
                        return (<tr ref={lastElement} 
                                    key={`${item.eventNumber}${item.store}${item.sku}`}>
                                    <td>{item.store}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.description}</td>
                                    <td className='text-right'>{item.highestCost !== null && formatWithThousandSeparator(item.highestCost.toFixed(2))}</td>
                                    <td className='text-right'>{formatWithThousandSeparator(item.highestRegularPrice.toFixed(2))}</td>
                                    <td className='text-right'>{item.eventNumber}</td>
                                    <td className='text-right'>{formatWithThousandSeparator(item.promoPrice.toFixed(2))}</td>
                                    <td className='text-right'>{item.margin !== null && formatWithThousandSeparator(item.margin.toFixed(2))}</td>
                                    <td className='text-right'>{formatWithThousandSeparator(item.priceDifference.toFixed(2))}</td>
                                    <td className='text-left'>{formatDate(item.eventBegin)}</td>
                                    <td className='text-left'>{formatDate(item.eventEnd)}</td>
                                    <td>{item.apply ? 'Yes' : 'No'}</td>
                                </tr>)
                    }
                    
                    }) : error === null && !isBusy && <tr><td colSpan='12' className='text-center'>No results</td></tr> }
                { error && !isBusy && <tr><td colSpan='12' className='text-center'>An error occurred:(</td></tr> }
                { !isBusy && !hasMore && items.length !== 0 && <tr><td colSpan='12' className='text-center'>That's it.</td></tr> }
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

export default PromotionsTable;

import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function usePriceChangesDataSource(page, pageSize, searchTerm) {
    
    const [error, setError] = useState(null);
    const [isBusy, setBusy] = useState(true);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() =>{
        setItems([]);
    }, [searchTerm]);

    useEffect(() =>{
        let isMounted = true;

        const controller = new AbortController();

        const signal = controller.signal;

        const getProducts = async () =>{
            
            setBusy(true);

            try{

                const response = await axios.get(`/api/pricebook2/pricechanges?PageSize=${pageSize}&Page=${page}&SearchTerm=${searchTerm}`, {
                    signal: signal
                });
                
                setHasMore(response.data.length === pageSize);

                isMounted && setItems(prev => [...prev, ...response.data]);

            } catch(exception){
                if(!signal.aborted){
                    setError(exception);
                    setHasMore(false);
                    console.error(exception);
                }
            }
            finally{
                setBusy(false);
            }
        }

        getProducts();

        return () =>{
            isMounted = false;
            controller.abort();
        };

    }, [page, pageSize, searchTerm]);
    
    return { error, isBusy, items, hasMore };
}

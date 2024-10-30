import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import DownloadsContext from '../context/DownloadsContext';

export const DownloadStatuses = {
    PreDownload: 832,
    Downloading: 1028,
    Downloaded: 2141,
    Aborted: 2412,
    Error: 3517
}

function DownloadContainer({id, name, saveas, url, state}) {
    const [statusText, setStatusText] = useState('');
    const [controller, setController] = useState(new AbortController());
    const [downloadStatus, setDownloadStatus] = useState(state);
    const [progress, setProgress] = useState(0);
    const [downloaded, setDownloaded] = useState(0);

    const { downloads, downloadsDispatcher } = useContext(DownloadsContext);

    useEffect(() =>{

        let isMounted = true;

        if(downloadStatus === DownloadStatuses.PreDownload){
            
            const runDownload = async () => {

                const onDownloadProgress = (progressEvent) => {
    
                    if(downloadStatus !== DownloadStatuses.Downloading){
                        setDownloadStatus(DownloadStatuses.Downloading);                    
                    }
    
                    const { loaded, total } = progressEvent;
    
                    setDownloaded(loaded);
    
                    setStatusText(`${(loaded/1024 ).toFixed(2)}/${(total/1024).toFixed(2)} kb`);
    
                    setProgress(Math.floor((loaded * 100) / total));
                };
    
                try{
    
                    const response = await axios.get(url, {
                        responseType: 'blob',
                        onDownloadProgress,
                        signal: controller.signal
                    });
    
                    const internalUrl = window.URL.createObjectURL(
                        new Blob([response.data], {
                          type: response.headers["content-type"],
                        })
                      );
    
                      setDownloadStatus(DownloadStatuses.Downloaded);
                      setStatusText('File downloaded');
    
                      if(isMounted){
                        const link = document.createElement("a");
                        link.href = internalUrl;
                        link.setAttribute("download", saveas);
                        document.body.appendChild(link);
                        link.click();
                      }
    
                } catch (exception) {
                    if(!controller.signal.aborted){
                        console.error(exception);
                        setDownloadStatus(DownloadStatuses.Error);
                        setStatusText('An error occurred.');
                    }
                }
            }
    
            runDownload();
        }

        return () =>{
            isMounted = false;
            controller.abort();
            if(downloadStatus == DownloadStatuses.PreDownload || downloadStatus === DownloadStatuses.Downloading){
                setDownloadStatus(DownloadStatuses.Aborted);
            }
        };

    }, []);

    useEffect(() => {
        downloadsDispatcher({
            type: 'ITEM_CHANGED',
            item:{
                id,
                state: downloadStatus
            }
        });
    }, [downloadStatus])
    const cancel = (event) =>{
        setDownloadStatus(DownloadStatuses.Aborted);
        setStatusText('Download Cancelled.');
        controller.abort();
    }
    
    switch(downloadStatus)
    {
        case DownloadStatuses.PreDownload:
            return(
                <div className='flex flex-row border border-dashed border-transparent hover:border-slate-500/50 px-2 py-1 items-center'>
                    <div className='grow pr-2'>
                        <p className='text-sm mb-1'>{name}<span className='text-gray-500 ml-3'>Preparing</span></p>
                        <div className="h-2 relative max-w-full animate-pulse rounded overflow-hidden mb-1">
                            <div className="w-full h-full bg-gray-300 absolute"></div>
                        </div>
                    </div>
                    <button className='flex-none text-xs hover:bg-slate-500/25 p-1 disabled:opacity-50'
                        onClick={cancel}>
                        Cancel
                    </button>
                </div>
            );
        case DownloadStatuses.Downloading:
            return(
                <div className='flex flex-row border border-dashed border-transparent hover:border-slate-500/50 px-2 py-1 items-center'>
                    <div className='grow pr-2'>
                        <p className='text-sm mb-1'>{name}<span className='text-gray-500 ml-3'>{statusText}</span></p>
                        <div className="h-2 relative max-w-full animate-pulse rounded overflow-hidden mb-1">
                                <div className="w-full h-full bg-gray-300 absolute"></div>
                                <div className='h-full absolute bg-green-500' style={{width: progress + '%'}}></div>
                        </div>
                    </div>
                    <button className='flex-none text-xs hover:bg-slate-500/25 p-1'
                        onClick={cancel}>
                        Cancel
                    </button>
                </div>
            );
        case DownloadStatuses.Downloaded:
            return (
                <div className='flex flex-row border border-dashed border-transparent hover:border-slate-500/50 px-2 py-1 items-center'>
                    <div className='grow pr-2'>
                        <p className='text-sm mb-1'>{name}<span className='text-gray-500 ml-3'>{statusText}</span></p>
                        <div className="h-2 relative max-w-full rounded overflow-hidden mb-1">
                                <div className="w-full h-full bg-gray-300 absolute"></div>
                                <div className='h-full absolute bg-green-500' style={{width: progress + '%'}}></div>
                        </div>
                    </div>
                    <button disabled className='flex-none text-xs hover:bg-slate-500/25 p-1 disabled:opacity-50'>
                        Cancel
                    </button>
                </div>
            );
        case DownloadStatuses.Aborted:
            return(
                <div className='flex flex-row border border-dashed border-transparent hover:border-slate-500/50 px-2 py-1 items-center'>
                    <div className='grow pr-2'>
                        <p className='text-sm mb-1'>{name}<span className='text-red-500 ml-3'>Canceled</span></p>
                        <div className="h-2 relative max-w-full rounded overflow-hidden mb-1">
                                <div className="w-full h-full bg-gray-300/50 absolute"></div>
                                <div className='h-full absolute bg-red-500' style={{width: progress + '%'}}></div>
                        </div>
                    </div>
                    <button disabled className='flex-none text-xs hover:bg-slate-500/25 p-1 disabled:opacity-50'>
                        Cancel
                    </button>
                </div>
            );
            case DownloadStatuses.Error:
                return(
                    <div className='flex flex-row border border-dashed border-transparent hover:border-slate-500/50 px-2 py-1 items-center'>
                        <div className='grow pr-2'>
                            <p className='text-sm mb-1'>{name}<span className='text-red-500 ml-3'>{statusText}</span></p>
                            <div className="h-2 relative max-w-full rounded overflow-hidden mb-1">
                                    <div className="w-full h-full bg-gray-300 absolute"></div>
                                    <div className='h-full absolute bg-red-500' style={{width: progress + '%'}}></div>
                            </div>
                        </div>
                        <button disabled className='flex-none text-xs hover:bg-slate-500/25 p-1 disabled:opacity-50'>
                            Cancel
                        </button>
                    </div>
                );
            default: 
                return (
                    <article className='shadow-md rounded-md bg-white border border-slate-300 p-3 my-3'>
                        <p className='text-lg font-semibold text-slate-600 block'>Unexpected Case</p>
                    </article>
                );
    }
}

function DownloadsContainer() {
    
    const [isMinimized, setMinimized] = useState(true);

    const toggleMinimizeButtonClickHandler = function(event){
        setMinimized(prev => !prev);
    }

    const { downloads } = useContext(DownloadsContext);

    useEffect(() => {
        setMinimized(downloads.length == 0);
    }, [downloads])

  return (
    <section className={'fixed w-full max-h-72 md:block md:w-1/3 lg:w-1/4 xl:w-1/5  rounded-t shadow-md bottom-0 right-0 md:right-5 bg-amber-100 select-none overflow-y-auto ' + (isMinimized ? '' : 'h-72' ) }>
        <div className='flex flex-row p-3 items-center bg-amber-200/25'>
            <p className='text-sm mr-3 grow'>Dowloads</p>
            <button className='order-12 hover:-translate-y-1 px-2'
                onClick={toggleMinimizeButtonClickHandler}>
                { isMinimized ? 
                    <FontAwesomeIcon icon={faChevronUp} size="sm"/> :
                    <FontAwesomeIcon icon={faChevronDown} size="sm"/>}
            </button>
        </div>
        <div className={'p-2 ' + (isMinimized ? 'hidden' : 'block') }>
            {
                downloads.map(item => {
                    return <DownloadContainer key={item.id} {...item} />
                })
            }

        </div>
    </section>);
}

export default DownloadsContainer;

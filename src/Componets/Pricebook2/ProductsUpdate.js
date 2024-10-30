import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ApiConstants from '../../api/constants';
import axios from '../../api/axios';
import DownloadsContext from '../../context/DownloadsContext';

function ProductsUpdate() {

  const [isBusy, setBusy] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('');
  const [wasSuccess, setSuccess] = useState(false);
  const [disableDownload, setDisableDownload] = useState(false);

  const [ selectedFile, setSelectedFile ] = useState(null);

  const { downloads, downloadsDispatcher } = useContext(DownloadsContext);

  function uploadFile(event){
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
  }

  useEffect(() =>{
    
    if(selectedFile !== null){
      
      let isMounted = true;
    
      const controller = new AbortController();
      
      const signal = controller.signal;
      
      const uploadSelectedFile = async () =>{
  
        setBusy(true);
        
        setMessage('Uploading file... (This may take some time)');

        const formData = new FormData();
        
        formData.append("file", selectedFile);
  
        try {
  
          const response = await axios({
            method: 'post',
            url: 'api/pricebook2/skuconfiguration/update',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
          });
  
          console.log(response);

          setMessage('Update file has been uploaded.');

          setSuccess(true);
          
          setSelectedFile(null);
  
        } catch(exception) {
  
          if(!signal.aborted){
            setHasError(true);

            if(exception.response && exception.response.data && exception.response.data.message){
              setMessage(exception.response.data.message);
            }else{
              setMessage('An error occurred.');
            }
            console.log(JSON.stringify(exception.request));
            console.log(JSON.stringify(exception.response));
            console.log(JSON.stringify(exception));
            console.error(exception.response);
        }
  
        } finally {
          setBusy(false);
        }
  
      };

      uploadSelectedFile();
  
      return () =>{
        isMounted = false;
        controller.abort();
      };
    }
  }, [selectedFile]);

  const downloadTemplate = function(event){
    
    setDisableDownload(true);

    downloadsDispatcher({
      type:'NEW',
      newItem: {
        name: 'Pricebook 2 Template',
        saveas: 'Pricebook 2 Template.xlsx',
        url: `${ApiConstants.baseUrl}/api/pricebook2/skuConfiguration/template`
      }
    });

    setTimeout(() => setDisableDownload(false), 2000);
  }

  return (
    <section>
        <h5 className='font-semibold mb-5'>Update Skus Configuration</h5>
        <p className='text-slate-500'>Select Sku update file for Metromart, Pickaroo, GrabMart, and PandaMart products</p>
        <div className='mt-2'>
          <div className='flex mb-1'>
            <input type='file' onChange={uploadFile}/>
            { isBusy && <FontAwesomeIcon icon={faStar} color='#ffcc00' className='my-auto' spin />}
          </div>
          <p className={ 'text-sm ' + (hasError ? 'text-red-500 ' : wasSuccess ? 'text-green-700 ' : '') }>{message}</p>
          <button className='inline-block m-3 cursor-pointer text-blue-500 disabled:text-slate-400 active:text-blue-600'
            disabled={disableDownload}
            onClick={downloadTemplate}>
            I don't have a template
          </button>
        </div>
    </section>
    );
}

export default ProductsUpdate;

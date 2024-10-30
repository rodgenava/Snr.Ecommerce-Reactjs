import React from 'react';

import {Link} from 'react-router-dom';

function NotFound() {
    React.useEffect(() =>{
        document.title = '👁👄👁';
      }, []);

  return (
    <main className='container mx-auto h-screen'>
        <div className='flex h-screen'>
            <div className='m-auto'>
                <h1 className='mx-auto text-9xl'>¯\_(ツ)_/¯</h1>
                <p className='mx-auto mt-10 text-6xl text-center'>Oopsie</p>
                <p className='mx-auto mt-5 text-center'>
                    We couldn't find what you're looking for...
                    <Link to='/' className='ml-3 text-blue-500'>Go back</Link>
                </p>
            </div>
        </div>
    </main>
    );
}


export default NotFound;

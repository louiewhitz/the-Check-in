import React, { useEffect } from 'react';
import Image from '../pages/images-spin/fidget-spinner.svg';

export default function LoadingSpinner(props) {

  useEffect(() => {
    const timer = setTimeout(() => {

    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // }, []);
  return (
    <div>
      <div className='overlay'/>
      <div className="spin-container">
        <Image className='spin' />

      </div>
    </div>
  );
}

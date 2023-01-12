import React from 'react';
import Image from '../pages/images-spin/fidget-spinner.svg';

export default function LoadingSpinner(props) {

  return (
    <div>
      <div className="spin-container">
        <Image className='spin' />
      </div>
    </div>
  );
}

import React from 'react';
import Image from '../pages/images-spin/fidget-spinner.svg';
export default function LoadingSpinner(props) {
  return (
    <div data-testid='loading-spinner'>
      <div className="spin-container">
        <Image className='spin' />
      </div>
    </div>
  );
}

// client/components/loading-spinner.jsx
// client/pages/images-spin/fidget-spinner.svg

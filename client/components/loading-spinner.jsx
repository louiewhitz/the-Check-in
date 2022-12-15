import React from 'react';
import Image from '../pages/images-spin/fidget-spinner.svg';

// import Spinner from 'react-bootstrap/Spinner';
// export default function LoadingSpinner(props) {
//   <section className="position-absolute top-0 left-0 bottom-0 right-0 d-flex justify-content-center z-10 align-items-center"><Spinner /></section>;
// }

export default function LoadingSpinner(props) {
  return (
    <div>
      <div className='overlay'/>
      <div className="spin-container">
        <Image className='spin' />
        {/* <div className="lds-circle">
          <div />
        </div> */}
        <div>Loading</div>
      </div>
    </div>
  );
}

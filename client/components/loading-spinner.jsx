import React, { useEffect } from 'react';
import Image from '../pages/images-spin/fidget-spinner.svg';

// import Spinner from 'react-bootstrap/Spinner';
// export default function LoadingSpinner(props) {
//   <section className="position-absolute top-0 left-0 bottom-0 right-0 d-flex justify-content-center z-10 align-items-center"><Spinner /></section>;
// }

export default function LoadingSpinner(props) {
  // const [show, setShow] = useState(false);
  // const timeoutRef = useRef();

  // useEffect(() => {
  //   timeoutRef.current = window.setTimeout(() => {
  //     setShow(false);
  //   }, 1500);
  //   return () => clearInterval(timeoutRef.current);

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

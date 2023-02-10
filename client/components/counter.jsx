// import React, { useState, useEffect } from 'react';

// function count() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     async function fetchCount() {
//       const response = await fetch('/api/count');
//       const data = await response.json();
//       setCount(data.count);
//     }
//     fetchCount();
//   }, []);

//   return (
//     <nav>
//       <h1>Count: {count}</h1>
//     </nav>
//   );
// }

// export default count;

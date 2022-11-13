import React from 'react';
import Home from './pages/home';
// import SchedulePage from './pages/schedule-page';
import Header from './components/nav';
import { Routes, Route } from 'react-router-dom';
import AddEvent from './pages/Add';
import Timeline from './pages/timeline';
import Calender from './pages/calendar';
import DatePicker from './pages/datepicker';
import AddForm from './pages/sendCompletedForm';

// import { parseRoute } from './lib';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/scheduling" element={<DatePicker />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path='/calendar' element={<Calender />} />
        <Route path="/addform" element={<AddForm />} />;

      </Routes>
    </div>
  );
}
export default App;

// export default class App extends React.Component {
// constructor(props) {
//   super(props);
// this.state = {
//   route: parseRoute(window.location.hash)
// };
// }

// componentDidMount() {
//   window.addEventListener('hashchange', () => {
//     const newRoute = window.location.hash;
//     const parsedRoute = parseRoute(newRoute);
//     this.setState({ route: parsedRoute });
//   });
// }

// renderPage() {
//   const { route } = this.state;
//   if (route.path === '') {
//     return <Home />;
//   }
// }

// render() {
//   return (
//     <>
//       <Header />

//       </>
//     );
//   }
// }

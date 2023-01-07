import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AppContext from '../lib/app-context';

export default class AddNewTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      timelineFor: '',
      lastPost: null

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleChange(event) {

    this.setState({
      timelineFor: event.target.value,
      lastPost: null
    });

    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { timelineFor } = this.state;

    console.log('file: new-timeline-form.jsx:49 ~ AddNewTimeline ~ handleSubmit ~ this.state', this.state);

    fetch('/api/timeline/timeline-id', {
      method: 'POST',
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      },

      body: JSON.stringify({ timelineFor })

    })
      .then(response => response.json())
      .then(result => {
        console.log('RESULT', result);

        window.location.hash = '#';
      })
      .catch(err => console.error('ERROR:', err));

  }

  render() {
    const { show, timelineFor } = this.state;
    console.log('file: new-timeline-form.jsx:64 ~ AddNewTimeline ~ render ~ this.state', this.state);

    return (
      <>
        <Button variant="info" onClick={this.handleShow}>
          CREATE NEW TIMELINE
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Form onSubmit={this.handleSubmit} id='timelineId'>

            <Modal.Header closeButton>
              <Modal.Title>Create Timeline</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
              <Form.Label htmlFor='timelineFor'>First and Last Name for a new Timeline
                <Form.Control
                type="text"
                name='timelineFor'
                placeholder="Lovedone's first and last name"
                autoFocus
                onChange={this.handleChange}
                value={timelineFor}
              />
              </Form.Label>
              {/* </Form.Group> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Nevermind
              </Button>
              <Button variant="primary" type='submit' onClick={this.handleClose } >
                Create Timeline
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

AddNewTimeline.contextType = AppContext;

// import React, { useState, useContext } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import AppContext from '../lib/app-context';

// function AddNewTimeline() {
//   const { user } = useContext(AppContext);
//   const [show, setShow] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [name, setName] = useState('');

//   const handleChange = event => {
//     setName(event.target.value);
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleSubmit = event => {
//     event.preventDefault();
//     setSubmitted(true);
//     const body = { name };

//     fetch('/api/timeline/timeline-id', {
//       method: 'POST',
//       headers: {
//         'X-Access-Token': localStorage.getItem('auth-token')
//       },
//       user,
//       body: JSON.stringify(body)

//     })
//       .then(response => response.json())
//       .then(result => {
//         const { timelineId } = result;
//         console.log("file: new-timeline-form.jsx:37 ~ handleSubmit ~ timelineId ", timelineId );

//         window.location.hash = '#';
//       })
//       .catch(err => console.error('ERROR:', err));

//   };

//   return (
//     <>
//       <Button variant="info" onClick={handleShow}>
//         CREATE NEW TIMELINE
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Timeline</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label >First and Last Name for a new Timeline</Form.Label>
//               <Form.Control
//                 type="text"
//                 name='name'
//                 placeholder="Lovedone's first and last name"
//                 autoFocus
//                 onChange={handleChange}
//                 value={name}
//               />
//             </Form.Group>

//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Nevermind
//           </Button>
//           <Button variant="primary" type='submit' onClick={handleClose}>
//             Create Timeline
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default AddNewTimeline;

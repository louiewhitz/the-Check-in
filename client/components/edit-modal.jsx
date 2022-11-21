// import React, { useState } from 'react';
// import AppContext from '../lib/app-context';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';
// import { RiEdit2Fill } from 'react-icons/ri';
// export default function EditModal(props) {
//   const { user } = this.context;

// if (!user) {
//   return <Redirect to="#sign-in" />;
// }

//   const title = props.title;
//   const description = props.description;
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   return (
//     <>
//       <Button onClick={handleShow} id="show-modal">
//         <RiEdit2Fill size={30} className="mx-1" style={{ fill: '#25aae1' }} />{' '}
//       </Button>
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{description}</Modal.Body>
//         {description}
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// import axios from 'axios';

// import Redirect from './components/redirect';

// function EditModal(props) {
// const [show, setShow] = useState(false);
// const [newtitle, setTitle] = useState('');

//   const { eventId, title, description } = props.event;
//   const idAttr = eventId;
//   const [updated, setUpdate] = [];

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button onClick={handleShow} id="show-modal">
//         <RiEdit2Fill size={30} className="mx-1" style={{ fill: '#25aae1' }} />
//       </Button>
//       <Modal show={show} onHide={handleClose} centered is={idAttr}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             <input
//               id="title"
//               required
//               name="title"
//               type="text"
//               // onChange={this.onChange}
//               value={title}
//               placeholder="Title..."
//               className="form-control rounded bg-transparent px-4 py-2.5 font-bold text-heading text-light"
//             />
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <textarea
//             className="form-control border-2 border-muted-2 bg-transparent px-4 py-2.5 text-light"
//             rows="5"
//             id="description"
//             name="description"
//             // onChange={this.onChange}
//             value={description}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// function ModalList(props) {
//   <section id="timeline">
//     {props.events.map(event => {
//       return <EditModal key={event.eventId} event={event} />;
//     })}
//   </section>;
// }

// ModalList.contextType = AppContext;

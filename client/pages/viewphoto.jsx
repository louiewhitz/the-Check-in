import React from 'react';
import { IoCamera } from 'react-icons/io5';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Button, Modal } from 'react-bootstrap';
const img = {
  height: '20rem',
  objectFit: 'cover'
};

const style = {

  width: '25rem',
  height: '100%'
};

export default class AllPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.eventId,
      photoUrl: this.props.photoUrl,
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
    const { user } = this.context;

    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user,
      body: JSON.stringify(this.state)
    };

    fetch(`/api/events/${this.props.eventId}`, req)
      .then(response => response.json())
      .then(result => {

        this.props.loadEvents();
      })

      .catch(err => console.error(err));

  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  render() {

    const { show } = this.state;

    return (
      <>
        <Button onClick={this.handleShow} id="show-modal">
          <IoCamera size={30} className="mx-1" style={{ fill: '#25aae1' }} />
        </Button>
        <Modal show={show} onHide={this.handleClose} centered className=''>
          <Modal.Body className='bg-dark'>

            <Container className='d-flex justify-content-center ' style={ style }>
              <Row>

                <Col>
                  <Card eventId={this.state.eventId} className='my-3 bg-transparent'>
                    <Card.Img variant='top'
              src={this.state.photoUrl}
              style={img}
            //   className="rounded-top img-fluid img"
            />
                    <Card.Body className="bg-dark"><Card.Title>{this.state.title}</Card.Title></Card.Body>
                  </Card>
                </Col>

              </Row>

            </Container>
          </Modal.Body>
          <Modal.Footer className='bg-secondary border-0'>
            <Button variant="primary" onClick={this.handleClose} className='d-block'>
              Back to TimeLine
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

AllPhotos.contextType = AppContext;

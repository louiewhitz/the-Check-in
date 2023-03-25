import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AppContext from '../lib/app-context';
import Container from 'react-bootstrap/Container';
import { IoPersonAddSharp } from 'react-icons/io5';

export default function NewTimeline() {
  const [isRelative, setIsRelative] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = e => {
    setIsRelative(e.target.checked);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <Button onClick={handleModalOpen} className="icon-shadow"><IoPersonAddSharp
      size={120}
      style={{ cursor: 'pointer', color: '#f5f5f5' }}

      />
      </Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Timeline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Control placeholder="Full name" />
              </Col>
            </Row>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Relative"
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Friend"
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            {isRelative && (
              <Form.Group controlId="formBasicRelation">
                <Form.Label>What&rsquo;s your relation?</Form.Label>
                <Form.Control placeholder="Relation" />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

NewTimeline.conextType = AppContext;

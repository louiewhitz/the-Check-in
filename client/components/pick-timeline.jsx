import React from 'react';
import Form from 'react-bootstrap/Form';

function SelectTimeline() {
  return (
    <Form.Select aria-label="select-timeline" className='select-width'>
      <option>Select an exisiting timeline</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  );
}

export default SelectTimeline;

import React, { useRef } from 'React';

const FileUploader = ({ onFileSelect }) => {
  const fileInput = useRef(null);
  const handleFileInput = e => {
    onFileSelect(e.target.files[0]);
  };
  return (
    <div className="mb-3 file-uploader">
      <label htmlFor="formFile">Default file input</label>
      <input
        className="form-control text-white-50 bg-dark"
        type="file"
        id="formFile"
        name="photo"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={{
          handleFileInput
        }}
      />
      <button
        onClick={e => fileInput.current && fileInput.current.click()}
        className="btn btn-primary"
      />
    </div>
  );
};

export default FileUploader;

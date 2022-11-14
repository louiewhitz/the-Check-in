import React from 'react';

class AllPhotos extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="text-white text-center">IMAGES</h3>
        <div className="row d-inline-flex flex-wrap">
          <div className="card me-3 row-fluid style">
            <a href="#viewphoto">
              <img
                src="/server/public/images/placeholder-image-square.jpg"
                className="rounded-top img-fluid img"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default AllPhotos;

import React from "react";
export default function HeadItem(props) {
  return (
    <>
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-stretch">
              <div className="member" data-aos="fade-up" data-aos-delay="100">
                <div className="member-img">
                  <img src={props.imageUrl} className="img-fluid" alt=""/>
                  <div className="social">
                    <a href="#"><i className="bi bi-facebook"></i></a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>{props.name}</h4>
                  <p>{props.post}</p>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}

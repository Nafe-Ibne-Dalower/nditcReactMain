import React from "react";
import HeadItem from "./HeadItem";
import executive from './executivesHead.json'
export default function Executive() {
  return (
    <>
      <section id="head" className="team">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Executive Committee</h2>
            <p>Check our Executive Committee</p>
          </div>
          <div
            className="row"
            data-aos="fade-up"
            data-aos-delay="100"
          >

            {executive.heads.map((element) => {
              return (
                  <>
                  <HeadItem 
                    name={element.name}
                    post={element.post}
                    imageUrl={element.image_url}
                    profileUrl={element.profile_url}
                    />
                </>
            )})}
          </div>
        </div>
      </section>
      
    </>
  );
}

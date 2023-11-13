import React from "react";
import ExecItem from "./ExecItem";
import executive from './executives.json'
export default function Executive() {
  return (
    <>
      <section id="executive" className="team">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Executive Committee</h2>
            <p>Check our Executive Committee</p>
          </div>

          <div className="row" data-aos="fade-up">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter=".filter-2022-2023">2022-2023</li>
              <li data-filter=".filter-2021-2022">2021-2022</li>
              <li data-filter=".filter-2020-2021">2020-2021</li>
              <li data-filter=".filter-2019-2020">2019-2020</li>
              <li data-filter=".filter-2018-2019">2018-2019</li>
            </ul>
          </div>
        </div>
          <div
            className="row portfolio-container"
            data-aos="fade-up"
            data-aos-delay="100"
          >

            {executive.sessions.map((element1) => {
              return (
                element1.members.map((element)=>{return(                
                    
                  <>
                  <ExecItem 
                  session = {element1.session}
                    name={element.name}
                    dept={element.dept}
                    post={element.post}
                    imageUrl={element.image_url}
                    profileUrl={element.profile_url}
                    />
                </>
                )}
              )
              )})}
          </div>
        </div>
      </section>
      
    </>
  );
}

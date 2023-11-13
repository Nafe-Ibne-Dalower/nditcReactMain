import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
    const [nameOfSender, setnameOfSender] = useState();
    const [email, setemail] = useState();
    const [msgt, setmsgt] = useState();

    const sendEmail = async () => {
      alert('Email sent successfully!');
            await axios.post('http://localhost:3000/send-email', {
                nameOfSender,
                email,
                msgt,
            });
            return;
    };
    return(
    <>
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Contact</h2>
            <p>Contact Us</p>
          </div>
          <div className="mcccont">
            <div className="mcc">
              <div className="lgw">
                <div className="form1">
                  <div className="mycmcont">
                    <h2 className="conhead">Feel free to contact with us...</h2>
                  </div>

                  <div className="cmi">
                    <div className="icu">
                      <div className="location">
                        <span
                          style={{ fontFamily: "Baloo Da 2", fontSize: "1rem" }}
                          className="bi bi-geo-alt-fill"
                        ></span>
                        <span id="cmii">Location: </span>
                        <span
                          style={{ fontFamily: "Baloo Da 2", fontSize: "1rem" }}
                        >
                          Toyenbee Circular Road, Dhaka 1000
                        </span>
                      </div>
                      <div className="email">
                        <span
                          style={{ fontFamily: "Baloo Da 2", fontSize: "1rem" }}
                          className="bi bi-envelope-fill"
                        ></span>
                        <span id="cmii">E-mail: </span>
                        <span
                          style={{
                            fontFamily: "Baloo Da 2",
                            fontSize: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          &nbsp;nditc.official@gmail.com
                        </span>
                      </div>
                      <div className="call">
                        <span
                          style={{ fontFamily: "Baloo Da 2", fontSize: "1rem" }}
                          className="bi bi-telephone-fill"
                        ></span>
                        <span id="cmii">Call us: </span>
                        <span
                          style={{
                            fontFamily: "Baloo Da 2",
                            fontSize: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          +8801793-4716257
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mcc">
              <div className="lgw">
                <form className="form">
                  <h2
                    style={{
                      fontWeight: "800",
                      paddingTop: "25px",
                      paddingBottom: "4px",
                      fontFamily: "Baloo Da 2",
                      fontSize: "2rem",
                    }}
                  >
                    Directly message us...
                  </h2>

                  <div className="mycmcont">
                    <div className="cmw">
                      <div className="cunpc">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={nameOfSender}
                          onChange={(e) => setnameOfSender(e.target.value)}
                          className="cunpctxt"
                          required
                          autocomplete="off"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="cunpc">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="cunpctxt"
                          required
                          autocomplete="off"
                          placeholder="E-mail"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="msg">
                    <textarea
                      name="msgt"
                      value={msgt}
                      onChange={(e) => setmsgt(e.target.value)}
                      id="msgt"
                      placeholder="Your Message here"
                      required
                    ></textarea>
                  </div>
                  <div className="btncontact">
                    <input type="reset" value="Reset" className="submit-btn" />
                    <button type="button" className="submit-btn" onClick={()=>sendEmail()}>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

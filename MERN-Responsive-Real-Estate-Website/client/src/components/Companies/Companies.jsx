import React from "react";
import "./Companies.css";
import Marquee from "react-fast-marquee";
const Companies = () => {
  return (
    <section className="logos">
      <div className="wrapperCompany">
      <h2 className="pText">Our Partner Companies</h2>
      <div className="logoOne">
        <Marquee pauseOnHover="true" autoFill="true" style={{ height: "5rem" }}>
          <a href="https://www.prologis.com/" className="logoPic">
            {" "}
            <img
              src="./prologis.png"
              style={{
                height: "5rem",
                paddingRight: "1rem",
                justifyContent: "center",
                
              }}
              alt=""
            />
          </a>
          <a className="logoPic" href="https://www.towerrealestate.com.au/">
            {" "}
            <img
              src="./tower.png"
              style={{
                height: "5rem",
                paddingRight: "1rem",
                justifyContent: "center",
              }}
              alt=""
            />
          </a>
          <a className="logoPic" href="https://www.equinix.com/">
            {" "}
            <img
              src="./equinix.png"
              style={{
                height: "5rem",
                paddingRight: "1rem",
                justifyContent: "center",
              }}
              alt=""
            />
          </a>
          <a className="logoPic"  href="https://www.realty.com/">
            <img
              src="./realty.png"
              style={{ height: "5rem", justifyContent: "center" }}
              alt=""
            />
          </a>
        </Marquee>
      </div>
      </div>
    </section>
  );
};

export default Companies;

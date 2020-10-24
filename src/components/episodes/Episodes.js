import React from "react";
// import Button from '@material-ui/core/Button';
import Episode from "./episode/Episode";
import "./Episodes.scss";

const Episodes = ({ episodes }) => {
  
  return (
    <div className="episodes-container">
      <div className="grid">
        {episodes.map((e) => (
          <Episode key={e._id} {...e} />
        ))}
      </div>
      {/* <Button size="large" color="primary" className="load-more-button" onClick={() => console.log("clicado")}>
        CARREGAR MAIS
      </Button> */}
    </div>
  );
};

export default Episodes;

import React from "react";

const Preloader = () => {
  return (
    <div>
      <img
        className="w-[7rem] h-[7rem] items-center justify-center"
        src={process.env.PUBLIC_URL + "/img/storm.gif"}
        alt="Preloader"
      />
    </div>
  );
};

export default Preloader;

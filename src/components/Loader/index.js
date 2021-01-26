import React from "react";
import "./style.scss";

const Loader = props => {
  return (
<div className={props.isLoading ? "container loader__bg" : "loader__hidden"}>
<div className="loader">
      <svg>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
</div>
  );
};

export default Loader;

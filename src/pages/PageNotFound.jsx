import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div id="pageNotFound">
      <div className="container centered column full-width">
        <div className="title">
          <h1>404</h1>
        </div>
        <div className="text-block">
          <p>
            Page not found - is probably the most annoying thing to look at, on
            a screen.
          </p>
          <p>
            <strong>
              <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Rome_wasn%27t_built_in_a_day"
                rel="noreferrer"
              >
                Rome was not built in a day.
              </a>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;

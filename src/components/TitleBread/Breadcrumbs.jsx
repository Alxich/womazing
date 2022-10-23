import React from "react";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumbs = () => {
  const routes = [{ path: "/a/b", breadcrumb: null }];

  const breadcrumbs = useBreadcrumbs(routes, {
    excludePaths: ["/shop/product"],
  });

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <React.Fragment key={match.pathname}>
          <NavLink to={match.pathname}>{breadcrumb}</NavLink>
          <span className="separator"></span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

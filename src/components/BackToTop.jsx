import React from "react";
import classNames from "classnames";

import { Button } from "../components";
import { scrollTo } from "../scrollTo";

function BackToTop({ isOpenSidebar }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isWhite, setIsWhite] = React.useState(false);

  const handleClick = () => scrollTo({ id: "scroll-top-behavior" });

  React.useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight -
          document.querySelector("footer").offsetHeight +
          35
      ) {
        setIsWhite(true);
      } else {
        setIsWhite(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Button
      className={classNames(
        { isVisible: isVisible },
        { isHidden: !isVisible },
        { isHiddenOnSidebar: isOpenSidebar },
        { isWhite: isWhite }
      )}
      toTop
      onClick={handleClick}
    >
      Back to top
    </Button>
  );
}

export default BackToTop;

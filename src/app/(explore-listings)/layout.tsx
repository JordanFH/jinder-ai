import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      {children}
    </div>
  );
};

export default Layout;

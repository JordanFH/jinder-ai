import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION, NAVIGATION_DEMO } from "@/data/navigation";

function Navigation() {
  return (
    <ul className="nc-Navigation hidden md:flex lg:flex-wrap lg:space-x-1 relative">
      {NAVIGATION.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;

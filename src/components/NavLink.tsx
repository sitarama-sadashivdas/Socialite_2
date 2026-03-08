/**
 * Aura Dashboard - Navigation Link Component
 * 
 * This component extends React Router's NavLink with additional className props
 * for handling active and pending states. It provides a seamless integration
 * between React Router's navigation and custom styling capabilities.
 * 
 * @component
 * @extends NavLink from react-router-dom
 * @prop {string} className - Base CSS classes
 * @prop {string} activeClassName - Classes applied when link is active
 * @prop {string} pendingClassName - Classes applied when link is pending
 * @prop {string} to - Navigation target path
 * 
 * @see https://reactrouter.com/en/main/components/nav-link
 */

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

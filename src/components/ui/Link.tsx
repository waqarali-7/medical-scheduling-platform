"use client";

import React from "react";
import Link, { LinkProps } from "next/link";

const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => <Link {...props} ref={ref} />);

NextLink.displayName = "NextLink";

export default NextLink;

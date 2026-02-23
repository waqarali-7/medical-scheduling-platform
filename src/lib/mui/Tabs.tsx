"use client";

import React from "react";
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  TabsProps as MuiTabsProps,
  Box,
} from "@mui/material";

export interface TabItem {
  label: string;
  value: string;
  content?: React.ReactNode;
}

export interface TabsProps extends Omit<MuiTabsProps, "onChange"> {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  showContent?: boolean;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, value, onChange, showContent = true, ...props }, ref) => {
    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
      onChange(newValue);
    };

    const activeTab = tabs.find((tab) => tab.value === value);

    return (
      <Box ref={ref}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          {...props}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px 8px 0 0",
            },
            ...props.sx,
          }}
        >
          {tabs.map((tab) => (
            <MuiTab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </MuiTabs>
        {showContent && activeTab?.content && (
          <Box sx={{ p: 3 }}>{activeTab.content}</Box>
        )}
      </Box>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;

"use client";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps as MuiDialogProps,
  IconButton,
} from "@mui/material";
export interface DialogProps extends MuiDialogProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({ title, children, actions, onClose, ...props }, ref) => {
  return (
    <MuiDialog
      ref={ref}
      onClose={onClose}
      {...props}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          minWidth: 400,
        },
      }}
    >
      {title && (
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {title}
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions sx={{ px: 3, pb: 3 }}>{actions}</DialogActions>}
    </MuiDialog>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;

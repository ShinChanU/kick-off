import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type TProps = {
  isOpen: boolean;
  headerText: string;
  headerAlign?: "start" | "center";
  subText?: string;
  leftButtonLabel?: string;
  leftHandleClick?: () => void;
  rightButtonLabel?: string;
  rightHandleClick?: () => void;
  children?: ReactNode;
};

export default function Modal({
  headerText,
  isOpen,
  children,
  headerAlign,
  leftButtonLabel,
  leftHandleClick,
  rightButtonLabel,
  rightHandleClick,
  subText,
}: TProps) {
  return (
    <Dialog open={isOpen}>
      {/* 260px */}
      <DialogContent className="w-[17rem]">
        <DialogHeader>
          <DialogTitle
            className={headerAlign === "center" ? "text-center" : "text-start"}
          >
            {headerText}
          </DialogTitle>
          {subText && (
            <DialogDescription className="whitespace-pre-wrap text-center">
              {subText}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}

        <div className="flex gap-4">
          {leftButtonLabel && leftHandleClick && (
            <Button
              variant={"ghost"}
              size="lg"
              className="flex-1"
              onClick={leftHandleClick}
            >
              {leftButtonLabel}
            </Button>
          )}

          {rightButtonLabel && rightHandleClick && (
            <Button
              variant={"ghost"}
              size="lg"
              className="flex-1 text-primary hover:bg-primary hover:text-primary-foreground "
              onClick={rightHandleClick}
            >
              {rightButtonLabel}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";

const useModalHook = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const onShow = () => {
    setIsOpen(true);
  };

  const onHide = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    onShow,
    onHide,
    onToggle,
  };
};

export type TPopupReturn = ReturnType<typeof useModalHook>;

export default useModalHook;

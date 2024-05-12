import { ReactNode } from "react";

function TypographyTitle1({ children }: { children: ReactNode }) {
  return (
    <h1 className={"scroll-m-20 whitespace-pre-wrap text-title-lg"}>
      {children}
    </h1>
  );
}

function TypographyTitle2({ children }: { children: ReactNode }) {
  return (
    <h2 className={"scroll-m-20 whitespace-pre-wrap text-title-sm"}>
      {children}
    </h2>
  );
}

function TypographyDescription1({ children }: { children: ReactNode }) {
  return (
    <div className={"scroll-m-20 whitespace-pre-wrap text-desc-lg"}>
      {children}
    </div>
  );
}

function TypographyDescription2({ children }: { children: ReactNode }) {
  return (
    <div className={"scroll-m-20 whitespace-pre-wrap text-desc-sm"}>
      {children}
    </div>
  );
}

function TypographyCaption({ children }: { children: ReactNode }) {
  return (
    <div className={"scroll-m-20 whitespace-pre-wrap text-caption"}>
      {children}
    </div>
  );
}

function TypographyOverline({ children }: { children: ReactNode }) {
  return (
    <div className={"scroll-m-20 whitespace-pre-wrap text-overline"}>
      {children}
    </div>
  );
}

export {
  TypographyCaption,
  TypographyDescription1,
  TypographyDescription2,
  TypographyOverline,
  TypographyTitle1,
  TypographyTitle2,
};

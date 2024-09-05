import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  flags: Array<boolean>;
  text?: string;
};

const Loader = ({ flags, text }: Props) => {
  return (
    <>
      {flags?.includes(true) ? (
        <>
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          {!!text ? (
            <p className="mt-2 text-sm text-slate-400">{text}</p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loader;

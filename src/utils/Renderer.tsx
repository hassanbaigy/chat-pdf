import { FC, Fragment, ReactNode } from "react";

type RendererProps = {
  flags: boolean[];
  showMessage?: boolean;
  children: ReactNode;
};
const Renderer: FC<RendererProps> = ({
  flags,
  showMessage = false,
  children,
}) => {
  return flags.includes(false) ? (
    <Fragment>
      {showMessage ? "You have exceeeded your limit of 5 chats" : null}
    </Fragment>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default Renderer;

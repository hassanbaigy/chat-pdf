"use client";
import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type Props = {};

const queryClient = new QueryClient();

const Providers = (props: PropsWithChildren<Props>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default Providers;

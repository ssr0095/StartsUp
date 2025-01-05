import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <main>
      <Navbar />
      {children}
      <Toaster />
    </main>
  );
};

export default layout;

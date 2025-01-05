"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SearchFormReset = () => {
  const router = useRouter();
  const reset = () => {
    const form = document.querySelector("Form") as HTMLFormElement;

    if (form) form.reset();
    router.push("/");
  };
  return (
    <button type="reset" onClick={reset} className="search-btn">
      <X className="size-5" />
    </button>
  );
};

export default SearchFormReset;

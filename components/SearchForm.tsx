import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" className="search-form">
      <input
        name="query"
        defaultValue=""
        placeholder="Search Startups"
        className="search-input"
      />
      <div className="flex gap-2 text-white">
        {query && <SearchFormReset />}
        <Button type="submit" className="search-btn">
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;

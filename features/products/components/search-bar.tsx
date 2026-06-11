import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-[860px] items-center rounded-full border border-[#dddddd] bg-white p-2 shadow-[0_12px_30px_rgba(40,32,25,0.04)]">
      <Search size={20} className="ml-4 shrink-0 text-[#9f9892]" />
      <input
        className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#292521] outline-none placeholder:text-[#9b958e]"
        placeholder="Search 1,200+ AI products by name, category or use case"
      />
      <button className="h-12 rounded-full bg-[#ff385c] px-7 text-[14px] font-semibold text-white shadow-[0_12px_22px_rgba(255,95,115,0.22)] transition hover:bg-[#e31c5f]">
        Search&nbsp; +
      </button>
    </div>
  );
}

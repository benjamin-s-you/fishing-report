"use client";
/**
 * Marked as Client Component
 */

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { fetchAllStations } from "@/app/lib/tide/api";
import { Station } from "@/app/lib/tide/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search({ placeholder }: { placeholder: string }) {
  /**
   * Related for URL query information
   */
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /**
   * This function updates the URL query - uses useDebouncedCallback for typing of 300ms
   * @param term - Value from Input
   * @returns Nothing
   */
  const updateURLQuery = useDebouncedCallback((term) => {
    const params: URLSearchParams = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          updateURLQuery(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

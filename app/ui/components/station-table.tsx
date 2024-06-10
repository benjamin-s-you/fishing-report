"use client";
/**
 * Marked as Client Component
 */

import { Station } from "@/app/lib/tide/types";
import {
  Pagination,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function StationTable({ stations }: { stations: Station[] }) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const filterStations = (stations: Station[], query: string): Station[] => {
    return stations.filter((station) =>
      Object.values(station).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const stationColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "STATION NAME" },
    { key: "lat", label: "LATITUDE" },
    { key: "lng", label: "LONGITUDE" },
    { key: "state", label: "STATE" },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  /**
   * Related for URL query information
   */
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const queryParam: string = searchParams.get("query") ?? "";

  /**
   * This function updates the URL query
   * @param key - Key from row
   * @returns Nothing
   */
  const updateURLQuery = (key: number | BigInt | string) => {
    const params: URLSearchParams = new URLSearchParams(searchParams);
    if (key) {
      params.set("stationId", key.toString());
    } else {
      params.delete("stationId");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  /**
   * Related to Table and Pagination NextUI Components
   */

  const filteredStations = useMemo(
    () => filterStations(stations, queryParam),
    [stations, queryParam]
  );

  useEffect(() => {
    setPage(1); // Reset to the first page on filter change
  }, [filteredStations]);
  const pages = Math.ceil(filteredStations.length / rowsPerPage);

  const sortedDisplayedItems = React.useMemo(() => {
    return [...filteredStations].sort((a, b) => {
      const first = String(a[sortDescriptor.column]);
      const second = String(b[sortDescriptor.column]);

      let cmp = first.localeCompare(second, undefined, { numeric: true });

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredStations]);

  const displayItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedDisplayedItems.slice(start, end);
  }, [page, sortedDisplayedItems]);

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{ wrapper: "min-h-[222px]" }}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      onRowAction={(key) => updateURLQuery(key)}
    >
      <TableHeader columns={stationColumns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={displayItems}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(station: any) => (
          <TableRow key={station.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(station, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

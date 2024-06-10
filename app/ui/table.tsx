"use client";

import { Station } from "@/app/lib/tide/types";
import {
  Pagination,
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
import { stationColumns, filterStations } from "@/app/ui/helpers/table-helpers";

export default function StationsTable({
  stations,
  query,
}: {
  stations: Station[];
  query: string;
}) {
  const handleStation = (key: any) => {
    console.log(key);
  };
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  const filteredStations = useMemo(
    () => filterStations(stations, query),
    [stations, query]
  );

  useEffect(() => {
    setPage(1); // Reset to the first page on filter change
  }, [filteredStations]);
  const pages = Math.ceil(filteredStations.length / rowsPerPage);

  const displayItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredStations.slice(start, end);
  }, [page, filteredStations]);

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
      onRowAction={(key) => handleStation(key)}
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
        {(station) => (
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

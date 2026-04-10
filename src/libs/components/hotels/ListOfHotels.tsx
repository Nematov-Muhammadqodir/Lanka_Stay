import { Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import HotelsHeader from "./HotelsHeader";
import SmallInfo from "./SmallInfo";
import HotelsGrid from "./Grid/HotelsGrid";
import HotelsList from "./List/HotelsList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setPage } from "@/src/slices/filteringSlice";

export interface ListOfHotelsProps {
  data: any;
}

const ListOfHotels = ({ data }: ListOfHotelsProps) => {
  const [grid, setGrid] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const list = data?.getAllAvailableProperties?.list ?? [];
  const total = data?.getAllAvailableProperties?.metaCounter?.[0]?.total ?? 0;
  const pageCount = Math.ceil(total / filters.limit);

  const handlePageChange = (_: any, value: number) => {
    dispatch(setPage(value));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack gap={2}>
      <HotelsHeader grid={grid} setGrid={setGrid} />
      <SmallInfo />
      {grid ? <HotelsGrid data={list} /> : <HotelsList data={list} />}
      {pageCount > 1 && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            count={pageCount}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ListOfHotels;

"use client";
import {
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
} from "material-react-table";
import { Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query"; //Note: this is TanStack React Query V5
import Link from "next/link";

//Your API response shape will probably be different. Knowing a total row count is important though.
type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
};

type User = {
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  lat: number;
  lon: number;
  country_code: string;
};

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: "ascii_name",
    header: "City",
    enableSorting: false,
    Cell: ({ cell }) => (
      <Link href={`/weather/${cell.getValue()}`} target="_blank">
        {cell.getValue() as string}
      </Link>
    ),
  },
  {
    accessorKey: "cou_name_en",
    header: "Country",
    enableSorting: false,
  },
  {
    accessorKey: "timezone",
    header: "Time Zone",
    enableSorting: false,
  },
  {
    accessorKey: "coordinates.lat",
    header: "Latitude",
    enableSorting: false,
  },
  {
    accessorKey: "coordinates.lon",
    header: "Longitude",
    enableSorting: false,
  },
  {
    accessorKey: "country_code",
    header: "Country Code",
    enableSorting: false,
  },
];

const fetchSize = 20;

const Example = () => {
  const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState<string>();
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const { data, fetchNextPage, isError, isFetching, isLoading } =
    useInfiniteQuery<UserApiResponse>({
      queryKey: [
        "table-data",
        columnFilters, //refetch when columnFilters changes
        globalFilter, //refetch when globalFilter changes
        sorting, //refetch when sorting changes
      ],
      queryFn: async ({ pageParam }: any) => {
        const url = new URL(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?"
        );
        {
          globalFilter && url.searchParams.set("where", `"${globalFilter}"`);
        }
        url.searchParams.set("order_by", "name");
        url.searchParams.set("limit", `${fetchSize}`);
        url.searchParams.set("offset", `${pageParam}`);

        const response = await fetch(url.href);
        const json = (await response.json()) as UserApiResponse;
        return json;
      },
      initialPageParam: 0,
      getNextPageParam: (_lastGroup: any, groups: any) => groups.length,
      refetchOnWindowFocus: false,
    });

  const flatData = useMemo(
    () => data?.pages.flatMap((page: any) => page.results) ?? [],
    [data]
  );

  const totalDBRowCount = 50000;

  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  //scroll to top of table when sorting or filters change
  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting, columnFilters, globalFilter]);

  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useMaterialReactTable({
    columns: columns as MRT_ColumnDef<any, any>[],
    data: flatData,
    enablePagination: false,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    manualFiltering: true,
    manualSorting: true,
    muiTableContainerProps: {
      ref: tableContainerRef, //get access to the table container element
      sx: { maxHeight: "550px" }, //give the table a max height
      onScroll: (event: UIEvent<HTMLDivElement>) =>
        fetchMoreOnBottomReached(event.target as HTMLDivElement), //add an event listener to the table container element
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    renderBottomToolbarCustomActions: () => (
      <Typography>Fetched total of {totalFetched} rows.</Typography>
    ),
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
    rowVirtualizerInstanceRef, //get access to the virtualizer instance
    rowVirtualizerOptions: { overscan: 4 },
  });

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const WeatherTable = () => (
  //App.tsx or AppProviders file. Don't just wrap this component with QueryClientProvider! Wrap your whole App!
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default WeatherTable;

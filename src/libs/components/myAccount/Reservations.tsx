import { Stack, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import Chance from "chance";

const Reservations = () => {
  interface Data {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    phone: string;
    state: string;
  }

  interface ColumnData {
    dataKey: keyof Data;
    label: string;
    numeric?: boolean;
    width?: number;
  }

  const chance = new Chance(42);

  function createData(id: number): Data {
    return {
      id,
      firstName: chance.first(),
      lastName: chance.last(),
      age: chance.age(),
      phone: chance.phone(),
      state: chance.state({ full: true }),
    };
  }

  const columns: ColumnData[] = [
    {
      width: 100,
      label: "Hotel Name",
      dataKey: "firstName",
    },
    {
      width: 100,
      label: "Room Type",
      dataKey: "lastName",
    },
    {
      width: 50,
      label: "Nights",
      dataKey: "age",
      numeric: true,
    },
    {
      width: 110,
      label: "Price",
      dataKey: "state",
    },
    {
      width: 130,
      label: "Hotel Contact Info",
      dataKey: "phone",
    },
  ];

  const rows: Data[] = Array.from({ length: 200 }, (_, index) =>
    createData(index)
  );

  const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width, fontWeight: "bold" }}
            sx={{ backgroundColor: "background.paper" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: Data) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Stack width={"100%"} mb={10} gap={2}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography variant="h4" fontWeight={699}>
            My reservations
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <Paper
          style={{
            height: 530,
            width: "100%",
            border: "none",
            boxShadow: "none",
          }}
        >
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default Reservations;

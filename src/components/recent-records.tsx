import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const records = [
    {
      id: "REC001",
      type: "Birth",
      name: "John Doe",
      date: "2023-05-15",
      status: "Registered",
    },
    {
      id: "REC002",
      type: "Marriage",
      name: "Jane Smith & Mike Johnson",
      date: "2023-05-14",
      status: "Pending",
    },
    {
      id: "REC003",
      type: "Death",
      name: "Alice Brown",
      date: "2023-05-13",
      status: "Registered",
    },
    {
      id: "REC004",
      type: "Birth",
      name: "Emily Davis",
      date: "2023-05-12",
      status: "Registered",
    },
    {
      id: "REC005",
      type: "Marriage",
      name: "Robert Wilson & Sarah Lee",
      date: "2023-05-11",
      status: "Pending",
    },
  ]
  
  export function RecentRecords() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Record ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.id}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell className="text-right">{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSales } from "@/data-access/payments";

export default async function Sales() {
  const sales = await getSales();
  const total = sales.reduce((acc, sale) => acc + sale.amount, 0);
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Sales
      </h1>
      <Table>
        <TableCaption>A list of your recent sales.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Purchase Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-medium">
                {sale.createdAt.toISOString().split("T")[0]}
              </TableCell>
              <TableCell>{sale.type}</TableCell>
              <TableCell>{sale.user.id}</TableCell>
              <TableCell className="text-right">
                ${(sale.amount / 100).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${(total / 100).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

import { endOfDay, format, parseISO, startOfDay } from "date-fns";
import { Calendar, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CircularProgress, DatePicker, Table } from "../../components";
import type { Column } from "../../components/Table";
import "../../styles/home.css";

interface Transaction {
	id: number;
	script: string;
	status: "completed" | "pending" | "cancelled";
	quantity: number;
	realizedPrice: number;
	buyingPrice: number;
	sellingPrice: number;
	target: number;
	stopLoss: number;
	percentage: number;
	createdAt: string;
	logo: string;
}

const transactions: Transaction[] = [
	{
		id: 1,
		script: "AAPL",
		status: "completed",
		quantity: 100,
		realizedPrice: 178.25,
		buyingPrice: 175.5,
		sellingPrice: 178.25,
		target: 185.0,
		stopLoss: 170.0,
		percentage: 80,
		createdAt: "2024-03-15T10:30:00",
		logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100&h=100&fit=crop&q=80",
	},
	{
		id: 2,
		script: "GOOGL",
		status: "completed",
		quantity: 50,
		realizedPrice: 145.3,
		buyingPrice: 142.75,
		sellingPrice: 145.3,
		target: 150.0,
		stopLoss: 138.0,
		percentage: 10,
		createdAt: "2024-03-14T15:45:00",
		logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&q=80",
	},
	{
		id: 3,
		script: "TSLA",
		status: "cancelled",
		quantity: 75,
		realizedPrice: 235.5,
		buyingPrice: 245.3,
		sellingPrice: 235.5,
		target: 260.0,
		stopLoss: 235.0,
		percentage: -40,
		createdAt: "2024-03-14T09:15:00",
		logo: "https://images.unsplash.com/photo-1617704548623-340376564e68?w=100&h=100&fit=crop&q=80",
	},
	{
		id: 4,
		script: "MSFT",
		status: "completed",
		quantity: 120,
		realizedPrice: 385.5,
		buyingPrice: 380.25,
		sellingPrice: 385.5,
		target: 395.0,
		stopLoss: 370.0,
		percentage: 30,
		createdAt: "2024-03-13T14:20:00",
		logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&h=100&fit=crop&q=80",
	},
];

const formatPrice = (price: number) => {
	return `$${price.toFixed(2)}`;
};

const formatDate = (dateStr: string) => {
	const date = parseISO(dateStr);
	return format(date, "MMM d, yyyy h:mm a");
};

const Transactions = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const filteredTransactions = useMemo(() => {
		if (!startDate && !endDate) return transactions;

		return transactions.filter((transaction) => {
			const transactionDate = parseISO(transaction.createdAt);
			const start = startDate ? startOfDay(parseISO(startDate)) : new Date(0);
			const end = endDate ? endOfDay(parseISO(endDate)) : endOfDay(new Date());

			return transactionDate >= start && transactionDate <= end;
		});
	}, [startDate, endDate]);

	const clearDates = () => {
		setStartDate("");
		setEndDate("");
	};

	const columns: Column<Transaction>[] = [
		{
			header: "Script",
			accessor: "script",
			align: "left",
			render: (value, item) => (
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg overflow-hidden neu-convex p-1">
						<img
							src={item.logo}
							alt={value}
							className="w-full h-full object-cover rounded-md"
						/>
					</div>
					<span className="font-semibold text-gray-200">{value}</span>
				</div>
			),
		},
		{
			header: "Status",
			accessor: "status",
			align: "center",
			render: (value) => (
				<span
					className={`
          px-3 
          py-1 
          rounded-full 
          text-sm 
          font-medium
          ${
						value === "completed"
							? "bg-green-400/10 text-green-400"
							: value === "pending"
							? "bg-yellow-400/10 text-yellow-400"
							: "bg-red-400/10 text-red-400"
					}
        `}
				>
					{value.charAt(0).toUpperCase() + value.slice(1)}
				</span>
			),
		},
		{
			header: "Quantity",
			accessor: "quantity",
			align: "right",
			render: (value) => (
				<span className="text-gray-300">{value.toLocaleString()}</span>
			),
		},
		{
			header: "Buy Price",
			accessor: "buyingPrice",
			align: "right",
			render: (value) => (
				<span className="text-gray-300">{formatPrice(value)}</span>
			),
		},
		{
			header: "Sell Price",
			accessor: "sellingPrice",
			align: "right",
			render: (value) => (
				<span className="text-gray-300">{formatPrice(value)}</span>
			),
		},
		{
			header: "Target",
			accessor: "target",
			align: "right",
			render: (value) => (
				<span className="text-green-400">{formatPrice(value)}</span>
			),
		},
		{
			header: "Stop Loss",
			accessor: "stopLoss",
			align: "right",
			render: (value) => (
				<span className="text-red-400">{formatPrice(value)}</span>
			),
		},
		{
			header: "Progress",
			accessor: "percentage",
			align: "center",
			render: (value) => (
				<div className="flex justify-center">
					<CircularProgress percentage={value} size={40} strokeWidth={20} />
				</div>
			),
		},
		{
			header: "Date",
			accessor: "createdAt",
			align: "right",
			render: (value) => (
				<span className="text-gray-400">{formatDate(value)}</span>
			),
		},
	];

	return (
		<div className="h-full">
			<div className="max-w-7xl">
				<div className="flex flex-col gap-6 mb-8">
					<div className="flex items-center gap-4">
						<div className="neu-button p-3 text-blue-400">
							<Calendar className="h-6 w-6" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-200">
								Transaction History
							</h1>
							<p className="text-sm text-gray-400 mt-1">
								View and filter your trading history
							</p>
						</div>
					</div>

					<div className="neu-card p-6">
						<div className="flex flex-col gap-6">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-200">
									Date Filter
								</h2>
								{(startDate || endDate) && (
									<button
										onClick={clearDates}
										className="
                      group
                      flex
                      items-center
                      gap-2
                      py-1
                      px-3
                      rounded-lg
                      text-sm
                      font-medium
                      text-red-400
                      transition-all
                      duration-300
                      hover:scale-105
                      active:scale-95
                    "
									>
										<X className="h-4 w-4" />
										<span>Clear</span>
									</button>
								)}
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<DatePicker
									label="Start Date"
									value={startDate}
									onChange={setStartDate}
									max={endDate || undefined}
								/>
								<DatePicker
									label="End Date"
									value={endDate}
									onChange={setEndDate}
									min={startDate || undefined}
								/>
							</div>
						</div>
					</div>
				</div>

				<Table
					data={filteredTransactions}
					columns={columns}
					className="w-full"
					emptyMessage="No transactions found for the selected date range"
				/>
			</div>
		</div>
	);
};

export default Transactions;

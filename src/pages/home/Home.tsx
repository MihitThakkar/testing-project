import {
	ArrowDownRight,
	ArrowUpRight,
	DollarSign,
	Minus,
	Plus,
	TrendingUp,
	X,
} from "lucide-react";
import { useState } from "react";
import { Header, Table } from "../../components";
import { Column } from "../../components/Table";
import "../../styles/home.css";

interface Transaction {
	id: number;
	script: string;
	quantity: number;
	buyingPrice: number;
	currentPrice: number;
	target: number;
	stopLoss: number;
}

const Home = () => {
	const [isActive, setIsActive] = useState(true);
	const [transactions, setTransactions] = useState<Transaction[]>([
		{
			id: 1,
			script: "AAPL",
			quantity: 100,
			buyingPrice: 175.5,
			currentPrice: 178.25,
			target: 185.0,
			stopLoss: 170.0,
		},
		{
			id: 2,
			script: "GOOGL",
			quantity: 50,
			buyingPrice: 142.75,
			currentPrice: 145.3,
			target: 150.0,
			stopLoss: 138.0,
		},
		{
			id: 3,
			script: "TSLA",
			quantity: 75,
			buyingPrice: 245.3,
			currentPrice: 250.75,
			target: 260.0,
			stopLoss: 235.0,
		},
		{
			id: 4,
			script: "MSFT",
			quantity: 120,
			buyingPrice: 380.25,
			currentPrice: 385.5,
			target: 395.0,
			stopLoss: 370.0,
		},
	]);

	const profitLossData = {
		total: "+$15,234",
		profit: "+$16,346",
		loss: "-$1,112",
	};

	const positionsData = {
		total: "12",
		active: "8",
		inactive: "4",
	};

	const handleQuantityChange = (id: number, change: number) => {
		setTransactions((prevTransactions) =>
			prevTransactions.map((transaction) => {
				if (transaction.id === id) {
					const newQuantity = Math.max(0, transaction.quantity + change);
					return { ...transaction, quantity: newQuantity };
				}
				return transaction;
			})
		);
	};

	const handleExit = (id: number) => {
		setTransactions((prevTransactions) =>
			prevTransactions.filter((transaction) => transaction.id !== id)
		);
	};

	const getPriceChangeColor = (current: number, buying: number) => {
		const change = ((current - buying) / buying) * 100;
		if (change > 0) return "text-green-400";
		if (change < 0) return "text-red-400";
		return "text-gray-400";
	};

	const formatPrice = (price: number) => {
		return `$${price.toFixed(2)}`;
	};

	const calculatePL = (
		currentPrice: number,
		buyingPrice: number,
		quantity: number
	) => {
		return (currentPrice - buyingPrice) * quantity;
	};

	const renderControls = (item: Transaction, isMobile: boolean = false) => (
		<div
			className={`
      ${isMobile ? "flex md:hidden" : "hidden md:flex"}
      ${isMobile ? "flex-col" : "flex-row"}
      ${isMobile ? "w-full" : "w-auto"}
      items-center
      gap-3
    `}
		>
			<div
				className={`
        relative
        group
        ${isMobile ? "w-full" : "w-[180px]"}
        p-1.5
        rounded-2xl
        bg-[#1a1b1e]
        shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
        hover:shadow-[inset_6px_6px_12px_#151617,_inset_-6px_-6px_12px_#1f2025]
        transition-all
        duration-300
      `}
			>
				<div className="flex items-center gap-3 w-full">
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleQuantityChange(item.id, -1);
						}}
						className="
              relative
              group/btn
              p-2
              rounded-xl
              transition-all
              duration-300
              hover:scale-110
              active:scale-95
              bg-gradient-to-br
              from-[#1c1d20]
              to-[#18191c]
              shadow-[3px_3px_6px_#151617,_-3px_-3px_6px_#1f2025]
              hover:shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
              active:shadow-[inset_3px_3px_6px_#151617,_inset_-3px_-3px_6px_#1f2025]
              overflow-hidden
            "
					>
						<div
							className="
              absolute
              inset-0
              rounded-xl
              bg-gradient-to-br
              from-red-400/0
              to-red-600/0
              opacity-0
              group-hover/btn:from-red-400/10
              group-hover/btn:to-red-600/5
              group-hover/btn:opacity-100
              transition-all
              duration-300
            "
						/>

						<Minus
							className="
              relative
              z-10
              h-4
              w-4
              text-red-400
              transition-all
              duration-300
              group-hover/btn:scale-110
              group-active/btn:scale-90
            "
						/>
					</button>

					<div
						className="
            relative
            flex-1
            py-2
            px-3
            rounded-xl
            bg-[#1a1b1e]
            shadow-[inset_3px_3px_6px_#151617,_inset_-3px_-3px_6px_#1f2025]
            overflow-hidden
          "
					>
						<div
							className="
              absolute
              inset-0
              bg-gradient-to-br
              from-blue-400/5
              to-purple-400/5
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
            "
						/>

						<span
							className="
              relative
              z-10
              block
              text-center
              font-semibold
              text-gray-200
              tracking-wider
              transition-all
              duration-300
              group-hover:text-blue-400
              group-hover:scale-105
            "
						>
							{item.quantity.toLocaleString()}
						</span>
					</div>

					<button
						onClick={(e) => {
							e.stopPropagation();
							handleQuantityChange(item.id, 1);
						}}
						className="
              relative
              group/btn
              p-2
              rounded-xl
              transition-all
              duration-300
              hover:scale-110
              active:scale-95
              bg-gradient-to-br
              from-[#1c1d20]
              to-[#18191c]
              shadow-[3px_3px_6px_#151617,_-3px_-3px_6px_#1f2025]
              hover:shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
              active:shadow-[inset_3px_3px_6px_#151617,_inset_-3px_-3px_6px_#1f2025]
              overflow-hidden
            "
					>
						<div
							className="
              absolute
              inset-0
              rounded-xl
              bg-gradient-to-br
              from-green-400/0
              to-green-600/0
              opacity-0
              group-hover/btn:from-green-400/10
              group-hover/btn:to-green-600/5
              group-hover/btn:opacity-100
              transition-all
              duration-300
            "
						/>

						<Plus
							className="
              relative
              z-10
              h-4
              w-4
              text-green-400
              transition-all
              duration-300
              group-hover/btn:scale-110
              group-active/btn:scale-90
            "
						/>
					</button>
				</div>
			</div>

			<button
				onClick={(e) => {
					e.stopPropagation();
					handleExit(item.id);
				}}
				className={`
          relative
          group
          ${isMobile ? "w-full" : "w-[100px]"}
          py-3
          rounded-xl
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
          bg-gradient-to-br
          from-[#1c1d20]
          to-[#18191c]
          shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
          hover:shadow-[6px_6px_12px_#151617,_-6px_-6px_12px_#1f2025]
          active:shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
          overflow-hidden
        `}
			>
				<div
					className="
          absolute
          inset-0
          rounded-xl
          bg-gradient-to-br
          from-red-400/0
          via-red-500/0
          to-red-600/0
          opacity-0
          group-hover:from-red-400/20
          group-hover:via-red-500/10
          group-hover:to-red-600/5
          group-hover:opacity-100
          transition-all
          duration-300
        "
				/>

				<div
					className="
          relative
          z-10
          flex
          items-center
          justify-center
          gap-2
          transition-all
          duration-300
        "
				>
					<X
						className="
            h-5
            w-5
            text-red-400
            transition-all
            duration-300
            group-hover:rotate-90
            group-hover:scale-110
          "
					/>

					<span
						className="
            text-sm
            font-medium
            text-red-400
            whitespace-nowrap
            transition-all
            duration-300
            group-hover:translate-x-0.5
            ${isMobile ? 'inline-block' : 'hidden sm:inline-block'}
          "
					>
						Exit
					</span>
				</div>
			</button>
		</div>
	);

	const columns: Column<Transaction>[] = [
		{
			header: "Script",
			accessor: "script",
			align: "left",
			render: (value) => (
				<span className="font-semibold text-gray-200">{value}</span>
			),
		},
		{
			header: "Avg",
			accessor: "buyingPrice",
			align: "right",
			render: (value) => (
				<span className="text-gray-300">{formatPrice(value)}</span>
			),
		},
		{
			header: "LTP",
			accessor: "currentPrice",
			align: "right",
			render: (value, item) => (
				<div className="flex items-center justify-end gap-1">
					{value > item.buyingPrice && (
						<ArrowUpRight className="h-4 w-4 text-green-400" />
					)}
					{value < item.buyingPrice && (
						<ArrowDownRight className="h-4 w-4 text-red-400" />
					)}
					<span
						className={`font-medium ${getPriceChangeColor(
							value,
							item.buyingPrice
						)}`}
					>
						{formatPrice(value)}
					</span>
				</div>
			),
		},
		{
			header: "Trg",
			accessor: "target",
			align: "right",
			render: (value) => (
				<span className="text-green-400 font-medium">{formatPrice(value)}</span>
			),
		},
		{
			header: "SL",
			accessor: "stopLoss",
			align: "right",
			render: (value) => (
				<span className="text-red-400 font-medium">{formatPrice(value)}</span>
			),
		},
		{
			header: "P&L",
			accessor: "currentPrice",
			align: "right",
			render: (value, item) => {
				const pl = calculatePL(value, item.buyingPrice, item.quantity);
				const isPositive = pl > 0;
				const isNegative = pl < 0;
				return (
					<div className="flex items-center justify-end gap-1">
						{isPositive && <ArrowUpRight className="h-4 w-4 text-green-400" />}
						{isNegative && <ArrowDownRight className="h-4 w-4 text-red-400" />}
						<span
							className={`font-medium ${
								isPositive
									? "text-green-400"
									: isNegative
									? "text-red-400"
									: "text-gray-400"
							}`}
						>
							{formatPrice(Math.abs(pl))}
							<span className="text-xs ml-1">
								{isPositive ? "+" : isNegative ? "-" : ""}
							</span>
						</span>
					</div>
				);
			},
		},
		{
			header: "Actions",
			accessor: "id",
			align: "center",
			render: (value, item) => (
				<>
					{renderControls(item)}
					{renderControls(item, true)}
				</>
			),
		},
	];

	return (
		<div className="h-full">
			<div className="max-w-7xl">
				<Header
					userName="John Doe"
					isActive={isActive}
					onToggleActive={setIsActive}
				/>

				<div className="mt-5 space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="neu-card p-4 hover:scale-[1.02] transition-all duration-300">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<div className="neu-button p-2 text-green-400">
										<DollarSign className="h-5 w-5" />
									</div>
									<h2 className="text-lg font-semibold text-gray-200">
										Total P/L
									</h2>
								</div>
								<p className="text-xl font-bold text-green-400">
									{profitLossData.total}
								</p>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="neu-concave p-3 rounded-xl">
									<div className="flex items-center gap-2">
										<ArrowUpRight className="h-4 w-4 text-green-400" />
										<span className="text-sm text-gray-400">Profit</span>
									</div>
									<span className="text-base font-semibold text-green-400 mt-1 block">
										{profitLossData.profit}
									</span>
								</div>
								<div className="neu-concave p-3 rounded-xl">
									<div className="flex items-center gap-2">
										<ArrowDownRight className="h-4 w-4 text-red-400" />
										<span className="text-sm text-gray-400">Loss</span>
									</div>
									<span className="text-base font-semibold text-red-400 mt-1 block">
										{profitLossData.loss}
									</span>
								</div>
							</div>
						</div>

						<div className="neu-card p-4 hover:scale-[1.02] transition-all duration-300">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<div className="neu-button p-2 text-blue-400">
										<TrendingUp className="h-5 w-5" />
									</div>
									<h2 className="text-lg font-semibold text-gray-200">
										Total Positions
									</h2>
								</div>
								<div className="neu-convex px-3 py-1">
									<p className="text-xl font-bold text-blue-400">
										{positionsData.total}
									</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="neu-concave p-3 rounded-xl">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-gray-400">Active</p>
											<p className="text-base font-semibold text-blue-400 mt-1">
												{positionsData.active}
											</p>
										</div>
										<div className="h-8 w-8 neu-convex rounded-lg flex items-center justify-center">
											<div
												className="h-6 w-6 rounded-md bg-blue-400/10"
												style={{
													background: `conic-gradient(rgb(96 165 250 / 0.4) ${
														(parseInt(positionsData.active) /
															parseInt(positionsData.total)) *
														100
													}%, transparent 0)`,
												}}
											/>
										</div>
									</div>
								</div>
								<div className="neu-concave p-3 rounded-xl">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-gray-400">Inactive</p>
											<p className="text-base font-semibold text-blue-400 mt-1">
												{positionsData.inactive}
											</p>
										</div>
										<div className="h-8 w-8 neu-convex rounded-lg flex items-center justify-center">
											<div
												className="h-6 w-6 rounded-md bg-blue-400/10"
												style={{
													background: `conic-gradient(rgb(96 165 250 / 0.4) ${
														(parseInt(positionsData.inactive) /
															parseInt(positionsData.total)) *
														100
													}%, transparent 0)`,
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold text-gray-200">
								Active Positions
							</h2>
							<div className="neu-convex px-3 py-1">
								<span className="text-sm font-medium text-blue-400">
									{transactions.length} Active
								</span>
							</div>
						</div>
						<Table data={transactions} columns={columns} className="w-full" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

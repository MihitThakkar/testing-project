import React from "react";
import Toggle from "./Toggle";

interface HeaderProps {
	userName: string;
	isActive: boolean;
	onToggleActive: (active: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
	userName,
	isActive,
	onToggleActive,
}) => {
	const getTimeOfDay = () => {
		const hour = new Date().getHours();
		if (hour < 12) return "morning";
		if (hour < 17) return "afternoon";
		return "evening";
	};

	return (
		<header className="neu-card p-6">
			<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-4">
					<div>
						<h1 className="text-xl sm:text-2xl font-bold text-gray-200">
							Good {getTimeOfDay()}, {userName}!
						</h1>
						<p className="text-sm sm:text-base text-gray-400 mt-1">
							Welcome back to your trading dashboard
						</p>
					</div>
				</div>

				<Toggle
					checked={isActive}
					onChange={onToggleActive}
					activeText="Trading Active"
					inactiveText="Trading Inactive"
					size="md"
					className="w-full sm:w-auto"
				/>
			</div>
		</header>
	);
};

export default Header;

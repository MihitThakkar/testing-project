import { Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button, ProfileCard, TradingPreferenceCard } from "../../components";
import "../../styles/home.css";

interface TradingPreference {
	id: number;
	script: string;
	quantity: number;
	target: number;
	stopLoss: number;
	isActive: boolean;
}

const Profile = () => {
	const [isActive, setIsActive] = useState(true);
	const [showNewForm, setShowNewForm] = useState(false);
	const [preferences, setPreferences] = useState<TradingPreference[]>([
		{
			id: 1,
			script: "AAPL",
			quantity: 100,
			target: 185.0,
			stopLoss: 170.0,
			isActive: true,
		},
		{
			id: 2,
			script: "GOOGL",
			quantity: 50,
			target: 150.0,
			stopLoss: 138.0,
			isActive: true,
		},
		{
			id: 3,
			script: "TSLA",
			quantity: 75,
			target: 260.0,
			stopLoss: 235.0,
			isActive: false,
		},
	]);

	const userData = {
		name: "John Doe",
		code: "TRD2024",
	};

	const handleAddPreference = () => {
		const newPreference: TradingPreference = {
			id: Date.now(),
			script: "",
			quantity: 0,
			target: 0,
			stopLoss: 0,
			isActive: true,
		};
		setPreferences((prev) => [newPreference, ...prev]);
	};

	const handleUpdatePreference = (
		id: number,
		updates: Partial<TradingPreference>
	) => {
		setPreferences((prev) =>
			prev.map((pref) => (pref.id === id ? { ...pref, ...updates } : pref))
		);
	};

	const handleDeletePreference = (id: number) => {
		setPreferences((prev) => prev.filter((pref) => pref.id !== id));
	};

	// Sort preferences to show new scripts first
	const sortedPreferences = [...preferences].sort((a, b) => {
		if (a.script === "") return -1;
		if (b.script === "") return 1;
		return 0;
	});

	return (
		<div className="h-full">
			<div className="max-w-7xl">
				<h1 className="text-2xl font-bold text-gray-200 mb-8">Profile</h1>

				<div className="space-y-8">
					<ProfileCard
						name={userData.name}
						code={userData.code}
						isActive={isActive}
						onToggleActive={setIsActive}
					/>

					<div className="space-y-6">
						{/* Trading Preferences Header */}
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<div className="neu-button p-3 text-blue-400">
									<TrendingUp className="h-6 w-6" />
								</div>
								<div>
									<h2 className="text-xl font-bold text-gray-200">
										Trading Preferences
									</h2>
									<p className="text-sm text-gray-400 mt-1">
										Manage your trading scripts and rules
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="neu-convex px-4 py-2">
									<span className="text-sm font-medium text-blue-400">
										{preferences.length} Scripts
									</span>
								</div>
								<Button
									onClick={handleAddPreference}
									size="sm"
									className="whitespace-nowrap"
								>
									<Plus className="h-4 w-4" />
									Add Script
								</Button>
							</div>
						</div>

						{/* Trading Preferences Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{sortedPreferences.map((preference) => (
								<TradingPreferenceCard
									key={preference.id}
									preference={preference}
									onUpdate={handleUpdatePreference}
									onDelete={handleDeletePreference}
									isNew={preference.script === ""}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

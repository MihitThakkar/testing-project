import React from "react";

interface CircularProgressProps {
	percentage: number;
	size?: number;
	strokeWidth?: number;
	className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
	percentage,
	size = 48,
	strokeWidth = 12,
	className = "",
}) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const progress = Math.min(Math.abs(percentage), 100);
	const offset = circumference - (progress / 100) * circumference;
	const isPositive = percentage >= 0;

	return (
		<div
			className={`
        relative
        rounded-full
        bg-[#1a1b1e]
        shadow-[6px_6px_12px_#0d0e0f,_-6px_-6px_12px_#27282d]
        p-3
        transition-all
        duration-300
        hover:scale-105
        group
        ${className}
      `}
			style={{ width: size + 24, height: size + 24 }}
		>
			{/* Outer Glow */}
			<div
				className={`
        absolute
        inset-0
        rounded-full
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
        ${
					isPositive
						? "bg-gradient-to-br from-green-400/20 to-green-600/10"
						: "bg-gradient-to-br from-red-400/20 to-red-600/10"
				}
      `}
			/>

			{/* Inner Shadow Layer */}
			<div
				className="
        absolute
        inset-3
        rounded-full
        bg-[#1a1b1e]
        shadow-[inset_3px_3px_6px_#151617,_inset_-3px_-3px_6px_#1f2025]
      "
			/>

			{/* Background Track */}
			<svg
				className="absolute inset-3 transform -rotate-90"
				width={size}
				height={size}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="currentColor"
					strokeWidth={strokeWidth}
					className="text-gray-800/30" // Increased opacity for better visibility
				/>
			</svg>

			{/* Progress Circle */}
			<svg
				className="absolute inset-3 transform -rotate-90"
				width={size}
				height={size}
			>
				<defs>
					<linearGradient
						id={`progressGradient-${isPositive ? "positive" : "negative"}`}
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						{isPositive ? (
							<>
								<stop offset="0%" stopColor="rgb(74 222 128)" />{" "}
								{/* Removed opacity for stronger color */}
								<stop offset="100%" stopColor="rgb(34 197 94)" />
							</>
						) : (
							<>
								<stop offset="0%" stopColor="rgb(248 113 113)" />
								<stop offset="100%" stopColor="rgb(239 68 68)" />
							</>
						)}
					</linearGradient>
				</defs>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke={`url(#progressGradient-${
						isPositive ? "positive" : "negative"
					})`}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className="transition-all duration-300 drop-shadow-lg"
				>
					<animate
						attributeName="stroke-dashoffset"
						from={circumference}
						to={offset}
						dur="1.5s"
						fill="freeze"
						calcMode="spline"
						keySplines="0.4 0 0.2 1"
					/>
				</circle>
			</svg>

			{/* Value Container */}
			<div
				className="
        absolute 
        inset-0 
        flex 
        items-center 
        justify-center
      "
			>
				{/* Value Background */}
				<div
					className={`
          relative
          h-[55%]
          w-[55%]
          rounded-full
          bg-[#1a1b1e]
          shadow-[2px_2px_4px_#151617,_-2px_-2px_4px_#1f2025]
          transition-transform
          duration-300
          group-hover:scale-105
          flex
          items-center
          justify-center
        `}
				>
					{/* Value Text */}
					<div
						className={`
            font-medium
            ${isPositive ? "text-green-400" : "text-red-400"}
            transition-all
            duration-300
            text-[11px]
            tracking-tight
          `}
					>
						{Math.abs(percentage).toFixed(0)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CircularProgress;

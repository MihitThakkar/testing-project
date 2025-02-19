import {
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	format,
	isSameDay,
	isToday,
	parseISO,
	startOfMonth,
	subMonths,
} from "date-fns";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface DatePickerProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	min?: string;
	max?: string;
	className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
	label,
	value,
	onChange,
	min,
	max,
	className = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(
		value ? parseISO(value) : new Date()
	);
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const formattedDate = value
		? format(parseISO(value), "MMM dd, yyyy")
		: "Select date";

	const minDate = min ? parseISO(min) : undefined;
	const maxDate = max ? parseISO(max) : undefined;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handlePrevMonth = () => {
		setCurrentMonth((prev) => subMonths(prev, 1));
	};

	const handleNextMonth = () => {
		setCurrentMonth((prev) => addMonths(prev, 1));
	};

	const handleDateSelect = (date: Date) => {
		onChange(format(date, "yyyy-MM-dd"));
		setIsOpen(false);
	};

	const days = eachDayOfInterval({
		start: startOfMonth(currentMonth),
		end: endOfMonth(currentMonth),
	});

	const isDateDisabled = (date: Date) => {
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	};

	return (
		<div
			ref={containerRef}
			className={`relative group ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Label */}
			<div className="flex items-center gap-2 mb-2">
				<div
					className={`
          p-2
          rounded-lg
          bg-[#1a1b1e]
          transition-all
          duration-300
          ${
						isHovered
							? "shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025] scale-110"
							: "shadow-[2px_2px_4px_#151617,_-2px_-2px_4px_#1f2025]"
					}
        `}
				>
					<Calendar
						className={`
            h-4 
            w-4 
            transition-all 
            duration-300
            ${isOpen ? "text-blue-400" : "text-gray-400"}
          `}
					/>
				</div>
				<label
					className={`
          text-sm 
          font-medium 
          transition-colors 
          duration-300
          ${isOpen ? "text-gray-200" : "text-gray-400"}
        `}
				>
					{label}
				</label>
			</div>

			{/* Input Container */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={`
            overflow-hidden
          w-full
          relative
          rounded-xl
          bg-[#1a1b1e]
          transition-all
          duration-300
          ${
						isOpen
							? "shadow-[8px_8px_16px_#0d0e0f,_-8px_-8px_16px_#27282d] scale-[1.02]"
							: isHovered
							? "shadow-[6px_6px_12px_#0d0e0f,_-6px_-6px_12px_#27282d] scale-[1.01]"
							: "shadow-[4px_4px_8px_#0d0e0f,_-4px_-4px_8px_#27282d]"
					}
        `}
			>
				{/* Gradient Overlay */}
				<div
					className={`
          absolute
          inset-0
          rounded-xl
          bg-gradient-to-br
          from-blue-400/5
          via-purple-400/5
          to-blue-400/5
          opacity-0
          transition-opacity
          duration-300
          ${isOpen || isHovered ? "opacity-100" : "opacity-0"}
        `}
				/>

				{/* Inner Shadow */}
				<div
					className={`
          absolute
          inset-[1px]
          rounded-xl
          bg-[#1a1b1e]
          transition-shadow
          duration-300
          ${
						isOpen
							? "shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]"
							: "shadow-[inset_2px_2px_4px_#151617,_inset_-2px_-2px_4px_#1f2025]"
					}
        `}
				/>

				{/* Display */}
				<div
					className="
          relative
          py-3.5
          px-4
          text-base
          font-medium
          flex
          items-center
          justify-between
          gap-3
        "
				>
					<span
						className={`
            transition-all
            duration-300
            ${
							value
								? "text-gray-200 font-semibold tracking-wide"
								: "text-gray-500"
						}
            ${isOpen && "scale-105 origin-left"}
          `}
					>
						{formattedDate}
					</span>
					<ChevronDown
						className={`
            h-4 
            w-4 
            transition-all
            duration-300
            ${
							isOpen
								? "text-blue-400 rotate-180 scale-110"
								: "text-gray-400 rotate-0"
						}
          `}
					/>
				</div>

				{/* Bottom Gradient Line */}
				<div
					className={`
          absolute
          bottom-0
          left-0
          h-0.5
          bg-gradient-to-r
          from-blue-400/80
          via-purple-400/80
          to-blue-400/80
          transition-all
          duration-500
          ${isOpen ? "w-full opacity-100" : "w-0 opacity-0"}
        `}
				/>
			</button>

			{/* Calendar Dropdown */}
			{isOpen && (
				<div
					className="
          absolute
          z-50
          mt-2
          w-full
          rounded-xl
          bg-[#1a1b1e]
          shadow-[12px_12px_24px_#0d0e0f,_-12px_-12px_24px_#27282d]
          p-4
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
				>
					{/* Month Navigation */}
					<div className="flex items-center justify-between mb-4">
						<button
							onClick={handlePrevMonth}
							className="
                relative
                p-2
                rounded-lg
                bg-[#1a1b1e]
                shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                hover:shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
                active:scale-95
                transition-all
                duration-200
                text-gray-400
                hover:text-blue-400
                group
              "
						>
							<ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
						</button>

						<div
							className="
              px-4
              py-2
              rounded-lg
              bg-[#1a1b1e]
              shadow-[inset_3px_3px_6px_#151617,_inset_-3px_-3px_6px_#1f2025]
              text-gray-200
              font-semibold
            "
						>
							{format(currentMonth, "MMMM yyyy")}
						</div>

						<button
							onClick={handleNextMonth}
							className="
                relative
                p-2
                rounded-lg
                bg-[#1a1b1e]
                shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                hover:shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
                active:scale-95
                transition-all
                duration-200
                text-gray-400
                hover:text-blue-400
                group
              "
						>
							<ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
						</button>
					</div>

					{/* Weekday Headers */}
					<div className="grid grid-cols-7 gap-1 mb-2">
						{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
							<div
								key={day}
								className="
                  text-center
                  text-xs
                  font-medium
                  text-gray-400
                  py-2
                "
							>
								{day}
							</div>
						))}
					</div>

					{/* Calendar Grid */}
					<div className="grid grid-cols-7 gap-1">
						{Array.from({ length: startOfMonth(currentMonth).getDay() }).map(
							(_, index) => (
								<div key={`empty-${index}`} className="aspect-square" />
							)
						)}

						{days.map((day) => {
							const isSelected = value && isSameDay(parseISO(value), day);
							const isDisabled = isDateDisabled(day);
							const isCurrent = isToday(day);

							return (
								<button
									key={day.toISOString()}
									onClick={() => !isDisabled && handleDateSelect(day)}
									disabled={isDisabled}
									className={`
                    relative
                    aspect-square
                    rounded-lg
                    transition-all
                    duration-200
                    group
                    ${
											isDisabled
												? "opacity-50 cursor-not-allowed"
												: "hover:scale-110"
										}
                    ${
											isSelected
												? `
                        bg-[#1a1b1e]
                        shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
                        text-blue-400
                        font-semibold
                      `
												: `
                        bg-[#1a1b1e]
                        shadow-[2px_2px_4px_#151617,_-2px_-2px_4px_#1f2025]
                        hover:shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                        text-gray-300
                        hover:text-gray-200
                      `
										}
                  `}
								>
									{/* Selected/Today Indicator */}
									{(isSelected || isCurrent) && (
										<div
											className={`
                      absolute
                      inset-0
                      rounded-lg
                      ${
												isSelected
													? "bg-gradient-to-br from-blue-400/20 to-purple-400/10"
													: "bg-gradient-to-br from-gray-400/10 to-gray-500/5"
											}
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-200
                    `}
										/>
									)}

									{/* Date Number */}
									<div
										className={`
                    relative
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                    text-sm
                    ${isCurrent && !isSelected && "text-blue-400 font-medium"}
                  `}
									>
										{format(day, "d")}
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePicker;

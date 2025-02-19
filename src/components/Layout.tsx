import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../styles/home.css";
import { Sidebar } from "./";

const Layout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen bg-[#1a1b1e] overflow-hidden">
			<div className="flex h-screen p-5">
				{/* Desktop Sidebar */}
				<div className="hidden lg:block w-[100px]">
					<Sidebar />
				</div>

				{/* Mobile Sidebar */}
				<div className="lg:hidden">
					<Sidebar
						isOpen={isSidebarOpen}
						onClose={() => setIsSidebarOpen(false)}
					/>
				</div>

				{/* Main Content */}
				<div className="flex-1 overflow-auto">
					{/* Mobile Menu Button */}
					<div className="lg:hidden m-4">
						<button
							onClick={() => setIsSidebarOpen(true)}
							className="
                relative
                p-3
                rounded-xl
                bg-[#1a1b1e]
                shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                hover:shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
                active:scale-95
                transition-all
                duration-300
                text-gray-400
                hover:text-blue-400
                overflow-hidden
                group
              "
						>
							<div
								className="
                absolute
                inset-0
                rounded-xl
                bg-gradient-to-br
                from-blue-400/10
                to-blue-600/5
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              "
							/>
							<Menu className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
						</button>
					</div>

					<div className="h-full py-5 px-6 sm:px-10">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;

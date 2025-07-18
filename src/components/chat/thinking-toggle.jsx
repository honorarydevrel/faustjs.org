import { HiBrain } from "react-icons/hi2";
import { useChatDialog } from "./state";

export default function ThinkingToggle() {
	const { thinkingMode, setThinkingMode } = useChatDialog();

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				onClick={() => setThinkingMode(!thinkingMode)}
				className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
					thinkingMode
						? "bg-purple-600 text-white shadow-lg shadow-purple-500/25 hover:bg-purple-700"
						: "bg-gray-700 text-gray-300 hover:bg-gray-600"
				}`}
				title={thinkingMode ? "Disable thinking mode" : "Enable thinking mode"}
			>
				<HiBrain className={`h-4 w-4 ${thinkingMode ? "animate-pulse" : ""}`} />
				<span>Thinking</span>
				{thinkingMode && (
					<span className="ml-1 h-2 w-2 animate-pulse rounded-full bg-green-400" />
				)}
			</button>
		</div>
	);
}

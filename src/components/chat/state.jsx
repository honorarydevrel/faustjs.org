import { createContext, useContext, useMemo, useRef, useState } from "react";

const ChatContext = createContext();

export const useChatDialog = () => {
	return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
	const dialog = useRef(null);
	const [thinkingMode, setThinkingMode] = useState(false);

	const value = useMemo(
		() => ({ dialog, thinkingMode, setThinkingMode }),
		[dialog, thinkingMode],
	);

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

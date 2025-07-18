import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatLink from "./chat-link";
import { classNames } from "@/utils/strings";

export default function Messages({ messages, className, showThinking = true }) {
	const messagesEndReference = useRef(null);
	useEffect(() => {
		messagesEndReference.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div
			className={classNames(
				"custom-scrollbar flex max-h-[calc(92dvh-12em)] flex-grow flex-col gap-4 overflow-y-scroll md:max-h-[calc(80dvh-12em)]",
				className,
			)}
			aria-live="polite"
			role="log"
		>
			{messages.map((message) => {
				const isAssistant = message.role === "assistant";
				const isLoading = message.content === "";
				const hasThinking = message.thinking && message.thinking.length > 0;

				return (
					<div
						key={message.id}
						className={classNames(
							isAssistant
								? "rounded-bl-sm bg-purple-900"
								: "self-end rounded-br-sm bg-blue-900",
							"prose prose-invert slide-in-bottom message-glow w-fit max-w-[90%] rounded-xl p-2 shadow-md transition-shadow duration-200 first:mt-0 last:mb-0 hover:shadow-lg",
						)}
					>
						{isLoading ? (
							<div className="flex items-center justify-center gap-1">
								<div className="animate-think h-2 w-2 rounded-full bg-gray-200 [animation-delay:-1s]" />
								<div className="animate-think h-2 w-2 rounded-full bg-gray-200 [animation-delay:-.5s]" />
								<div className="animate-think h-2 w-2 rounded-full bg-gray-200" />
							</div>
						) : (
							<>
								{hasThinking && showThinking && (
									<div className="thinking-section mb-3 rounded-lg border-l-4 border-purple-400 bg-purple-800/50 p-3">
										<div className="mb-2 text-sm font-medium text-purple-200">
											🤔 Thinking...
										</div>
										{message.thinking.map((thought, index) => (
											<div
												key={index}
												className="thinking-thought mb-2 text-sm text-purple-100 last:mb-0"
											>
												<Markdown
													remarkPlugins={[remarkGfm]}
													components={{
														a: ChatLink,
													}}
												>
													{thought}
												</Markdown>
											</div>
										))}
									</div>
								)}
								<Markdown
									remarkPlugins={[remarkGfm]}
									components={{
										a: ChatLink,
									}}
								>
									{message.content}
								</Markdown>
							</>
						)}
					</div>
				);
			})}
			<div ref={messagesEndReference} />
		</div>
	);
}

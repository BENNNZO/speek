"use client"

import { useChat } from "@ai-sdk/react";

export default function Home() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "api/openai" })

	return (
		<div className="p-12">
			<div className="flex flex-col gap-2">
				{messages.map((message) => {
					switch (message.role) {
						case "user":
							return (
								<p>{message.content}</p>
							)
						case "assistant":
							return (
								<p className="bg-zinc-800 px-3 py-2 rounded-lg">{message.content}</p>
							)
					}
					// <div key={message.id} className="bg-zinc-800">
					// 	<p>ROLE: {message.role}</p>
					// 	<p>CONTENT: {message.content}</p>
					// </div>
				})}
			</div>

			<form onSubmit={handleSubmit} className="bottom-4 left-1/2 fixed -translate-x-1/2">
				<input
					type="text"
					placeholder="Ask Anything..."
					value={input}
					onChange={handleInputChange}
					className="bg-zinc-800 px-4 py-2 rounded-full"
				/>
			</form>
		</div>
	);
}
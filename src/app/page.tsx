"use client"

import { useChat } from "@ai-sdk/react";

export default function Home() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "api/openai" })

	return (
		<div>
			<div>
				{messages.map((message) => (
					<div key={message.id}>
						<p>{message.role}</p>
						<p>{message.content}</p>
						{message.parts.map((part) => (
							<p>{part.type}</p>
						))}
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="say something..."
					value={input}
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}

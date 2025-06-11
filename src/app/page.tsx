import Link from "next/link";

export default function Home() {
	return (
		<div className="p-12">
			<Link href="/chat" className="bg-zinc-800 px-4 py-1 border border-white/15 rounded-full">Chat Page</Link>
			<div className="flex flex-col gap-2 mt-12">
				<p>Hero</p>
				<p>Features</p>
				<p>Why Choose Speek</p>
				<p>FAQ</p>
			</div>
		</div>
	);
}

// save images / attachments (only file type and name to save space) in db
// make the chat id system more robust
// added names to chats instead of just ID's
// make sure editing and everything works with db
// when adding editing to db functionality make it delete unused chats
// same for retry messages
import Link from "next/link";

import Hero from "@/components/landing/Hero";
import SideAnimations from "@/components/landing/SideAnimations";

export default function Home() {
	return (
		<div>
			<SideAnimations
				lineHeight={30}
				gap={10}
				duration={1.5}
				delay={0.35}
				widthVariation={25}
			/>
			<div className="px-76">
				<Hero />
				<Link data-testid="chat-page-button" href="/chat" className="bg-zinc-800 px-4 py-1 border border-white/15 rounded-full">Chat Page</Link>
				<div className="flex flex-col gap-2 mt-12">
					<p className="self-start bg-zinc-800 px-3 py-1 rounded-full">Hero</p>
					<p className="self-start bg-zinc-800 px-3 py-1 rounded-full">Features</p>
					<p className="self-start bg-zinc-800 px-3 py-1 rounded-full">Why Choose Speek</p>
					<p className="self-start bg-zinc-800 px-3 py-1 rounded-full">FAQ</p>
				</div>
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
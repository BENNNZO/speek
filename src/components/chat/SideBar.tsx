export default function SideBar({ state }: { state: boolean }) {
    return (
        <div className="z-10 relative">
            <div
                style={{ opacity: state ? 1 : 0 }}
                className="top-4 right-0 bottom-4 left-4 absolute bg-zinc-800 rounded-2xl overflow-hidden whitespace-nowrap duration-150 delay-75"
            >
                <div className="flex flex-col gap-2 p-1.5">
                    <p className="opacity-50 pt-2 pl-1.5">Quick Prompts</p>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">Civil Discourse Response</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">Civil Discourse Response</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">Civil Discourse Response</button>
                </div>
                <div className="flex flex-col gap-2 mt-4 p-1.5">
                    <p className="opacity-50 pt-2 pl-1.5">Chats</p>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                    <button className="hover:bg-zinc-700 px-2 py-1.5 rounded-xl overflow-hidden text-left text-ellipsis">testestestestest estest estest estest est</button>
                </div>
            </div>
        </div>
    )
}
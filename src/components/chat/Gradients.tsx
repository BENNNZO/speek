export default function Gradients({ color }: { color: string }) {
    return (
        <>
            <div className="top-0 left-0 fixed bg-gradient-to-b from-zinc-950 to-transparent w-[calc(100%-6px)] h-12"></div>
            <div className="bottom-4 left-0 fixed bg-gradient-to-t from-zinc-950 to-transparent w-[calc(100%-6px)] h-32"></div>
            <div className="bottom-0 left-0 fixed bg-zinc-950 w-[calc(100%-6px)] h-4"></div>
        </>
    )
}
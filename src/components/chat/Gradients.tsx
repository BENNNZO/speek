export default function Gradients({ color }: { color: string }) {
    return (
        <>
            <div style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }} className={`top-0 left-0 fixed w-[calc(100%-6px)] h-12`}></div>
            <div style={{ background: `linear-gradient(to top, ${color}, transparent)` }} className={`bottom-4 left-0 fixed w-[calc(100%-6px)] h-32`}></div>
            <div style={{ background: color }} className={`bottom-0 left-0 fixed w-[calc(100%-6px)] h-4`}></div>
        </>
    )
}
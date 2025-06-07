export default function SideBar({ state }: { state: boolean }) {
    return (
        <div className="z-10 relative">
            <div
                style={{ opacity: state ? 1 : 0 }}
                className="top-4 right-0 bottom-4 left-4 absolute bg-zinc-800 rounded-4xl overflow-hidden whitespace-nowrap duration-150 delay-75"
            >
                <p>hello world!</p>
            </div>
        </div>
    )
}
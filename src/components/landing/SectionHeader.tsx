export default function SectionHeader({ title, desc, subDesc }: { title: string, desc: string, subDesc: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <h2 className="px-3 py-0.5 border-2 border-indigo-500 rounded-full">{title}</h2>
                <h2 className="top-0 left-0 absolute bg-indigo-800 blur-2xl px-3 py-0.5 rounded-full">{title}</h2>
                <h2 className="top-0 left-0 absolute bg-indigo-600 opacity-50 blur-lg px-3 py-0.5 rounded-full">{title}</h2>
                <h2 className="top-0 left-0 absolute bg-indigo-950/50 shadow-md px-3 py-0.5 border-2 border-indigo-500 rounded-full">{title}</h2>
            </div>
            <p className="mt-12 max-w-3xl font-semibold text-5xl text-center">
                {desc}
                {/* Making Advanced AI Accessible With <span className="bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 overflow-hidden font-bold text-transparent">Affordable Intelligence</span> */}
                {/* Turning Aftificial Intelligence Into <span className="bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 overflow-hidden font-bold text-transparent">Affordable Intelligence</span> */}
            </p>
            <p className="opacity-50 mt-6 text-lg">{subDesc}</p>
        </div>
    )
}
import Image from "next/image";
import SectionHeader from "./SectionHeader";

interface PricesType {
    title: string,
    src: string,
    price: number,
    models: string[]
}

export default function WhyChooseSpeek() {
    const companies: PricesType[] = [
        {
            title: "Chat-GPT",
            src: "/openai.svg",
            price: 20,
            models: ["grok-3", "grok-3 plus"]
        },
        {
            title: "Claude",
            src: "/claude.svg",
            price: 20,
            models: ["grok-3", "grok-3 plus"]
        },
        {
            title: "Grok",
            src: "/grok.svg",
            price: 30,
            models: ["grok-3", "grok-3 plus"]
        }
    ]

    return (
        <div className="mt-12 mb-24">
            <SectionHeader
                title="Why Choose Speek AI"
                desc="Making Advanced AI Accessible With Affordable Intelligence"
                subDesc="Stop paying exorborent amounts for simple chat-bots"
            />
            <div className="flex justify-center gap-2 mx-auto mt-12 max-w-3xl">
                {companies.map((company, index) => (
                    <div
                        key={index}
                        className="flex gap-6 bg-black/50 backdrop-blur-sm py-4 pr-6 pl-4 border-t border-t-white/15 rounded-xl"
                    >
                        <Image
                            src={company.src}
                            width={40}
                            height={40}
                            alt={`${company.title.toLowerCase()}-logo`}
                            className="invert"
                        />
                        <div className="flex flex-col">
                            <p className="font-bold text-lg">{company.title}</p>
                            <p className="font-semibold text-red-400 tracking-wide">${company.price}.00/month</p>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className="flex gap-6 bg-black/50 backdrop-blur-sm py-4 pr-6 pl-4 border-t border-t-white/15 rounded-xl"
            >
                <Image
                    src={"openai.svg"}
                    width={40}
                    height={40}
                    alt="speek-logo"
                    className="invert"
                />
                <div className="flex flex-col">
                    <p className="font-bold text-lg">Speek</p>
                    <p className="font-semibold text-emerald-400 tracking-wide">$5.00/month</p>
                </div>
            </div>
        </div>
    )
}
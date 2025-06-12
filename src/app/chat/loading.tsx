import Image from "next/image"

export default function ChatLoadingPage() {
    return (
        <div className="place-items-center grid h-screen">
            <Image
                src="loader.svg"
                width={44}
                height={44}
                alt="loader animation"
            />
        </div>
    )
}
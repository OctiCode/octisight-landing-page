"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.back()}
			className="inline-flex items-center gap-2 text-text/70 hover:text-accent transition-colors duration-300 cursor-pointer"
		>
			<ArrowLeft className="w-4 h-4" />
			<span>Back</span>
		</button>
	);
}

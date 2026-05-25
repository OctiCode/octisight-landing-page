import Image from "next/image";

interface StepImageProps {
	src: string;
	alt: string;
	/** Pass true only for the first visible step (above the fold). Defaults to lazy. */
	priority?: boolean;
}

export default function StepImage({
	src,
	alt,
	priority = false,
}: StepImageProps) {
	return (
		<div className="w-full rounded-2xl overflow-hidden border border-light-contrast/30 shadow-2xl shadow-primary/30">
			<Image
				src={src}
				alt={alt}
				width={720}
				height={480}
				className="w-full h-auto object-cover"
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
				priority={priority}
			/>
		</div>
	);
}

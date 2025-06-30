import { Button } from "./ui/button";

export function DownloadButton({
	url,
	filename,
}: { url: string; filename: string }) {
	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		link.click();
	};

	return (
		<Button
			onClick={handleDownload}
			className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
		>
			Download
		</Button>
	);
}

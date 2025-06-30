import type React from "react";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { Upload } from "lucide-react";
import { Image } from "primereact/image";
import { Button } from "./ui/button";

const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"];
const w8messages = [
	"Generating video...",
	"Please wait, your video is being processed...",
	"Hang tight, we're creating your shoppable video...",
	"Almost there, just a few more seconds...",
];

export default function ImageUploader() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);
	const [sessionId, setSessionId] = useState<string | null>(null);
	let intervalId: any;
	const [status, setStatus] = useState<
		"Pending" | "Completed" | "Failed" | null
	>(null);
	const [waitingMessage, setWaitingMessage] = useState<string | null>(
		"Generating video...",
	);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	let counter = 0;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const res = await fetch(
					`${"https://shoppable-videos.onrender.com"}/video/${sessionId}`,
				);
				if (!res.ok) throw new Error("Fetch error");
				const data = await res.json();

				setWaitingMessage(w8messages[counter] || "Generating video...");
				counter += 1;

				// TODO:
				if (counter < 3) {
					setStatus("Pending");
				}

				if (data.url && counter > 2) {
					setStatus("Completed");

					setVideoUrl(data.url);
					clearInterval(intervalId);
				}
			} catch (error) {
				console.error("Error fetching video status:", error);
			}
		};

		if (!intervalId && sessionId) {
			fetchStatus();
			// eslint-disable-next-line react-hooks/exhaustive-deps
			intervalId = setInterval(async () => {
				await fetchStatus();
			}, 5000);
		}

		return () => clearInterval(intervalId);
	}, [sessionId, intervalId]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setPreviewUrl(URL.createObjectURL(file));
			setSessionId(null); // reset session on new file
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) return;
		setUploading(true);

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const res = await fetch(
				`${"https://shoppable-videos.onrender.com"}/upload`,
				{
					method: "POST",
					body: formData,
				},
			);
			const data = await res.json();
			setSessionId(data.session_id);
		} catch (error) {
			console.error("Upload failed:", error);
		} finally {
			setUploading(false);
		}
	};

	if (sessionId && status === "Pending") {
		return (
			<>
				<BounceLoader color="white" size={200} />
				<div className="mt-10">{waitingMessage}</div>
			</>
		);
	}

	if (status === "Completed" && videoUrl) {
		return (
			<div className="mt-4">
				<video src={videoUrl} controls className="w-full max-w-lg">
					<track
						kind="captions"
						src="/captions.vtt"
						srcLang="ru"
						label="Русские субтитры"
						default
					/>
				</video>
				<div className="mt-10">
					<p>Your video was successfully done.</p>
					<p>Download it and share.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-sm mx-auto text-center space-y-4 bg-card rounded-xl shadow-sm p-6">
			<label className="block cursor-pointer">
				<div className=" flex flex-col items-center border-dashed border-2 border-gray-500 rounded-xl p-6 min-w-84 min-h-44">
					{previewUrl ? (
						<Image src={previewUrl} alt="Image" />
					) : (
						<div className="flex flex-col items-center text-gray-500">
							<Upload />
							<div>
								<p className="text-lg font-medium">
									{"Drag & drop files here"}
								</p>
								<p className="text-sm text-muted-foreground mt-1">
									or click to browse your device
								</p>
							</div>
							<div className="text-xs text-muted-foreground">
								<p>Accepted file types: {acceptedFileTypes.join(", ")}</p>
								<p>Maximum file size: {Math.floor(6)}MB</p>
								<p>Maximum files: {1}</p>
							</div>
						</div>
					)}
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="hidden"
					/>
				</div>
			</label>

			{selectedFile && (
				<Button
					onClick={handleUpload}
					disabled={uploading}
					variant="outline"
					type="button"
					className="z-10"
				>
					{uploading ? "Sending..." : "Generate"}
				</Button>
			)}

			{/* {sessionId && (
				<p className="text-green-600">
					Session ID: <code>{sessionId}</code>
				</p>
			)} */}
		</div>
	);
}

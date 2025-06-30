import { useRef, useState } from "react";
// biome-ignore lint/style/useImportType: <explanation>
import {
	FileUploaderRegular,
	type OutputFileEntry,
	UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const UploadcareUploader = () => {
	const [files, setFiles] = useState<OutputFileEntry[]>([]);
	const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);

	const handleFileUpload = (file: OutputFileEntry) => {
		setFiles((prevFiles) => [...prevFiles, file]);
	};
	return (
		<section>
			<FileUploaderRegular
				pubkey={`${"3fba8da9faed8dad1e7d"}`}
				apiRef={uploaderRef}
				onFileUploadSuccess={handleFileUpload}
			/>
			<div className="img-gallery">
				{files.map((file) => (
					<img
						key={file.uuid}
						src={file.cdnUrl as string}
						alt="Preview"
						className="img-preview"
					/>
				))}
			</div>
		</section>
	);
};

export default UploadcareUploader;

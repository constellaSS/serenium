import NavBar from "../../components/layout/NavBar/NavBar";
import './NewPost.css'
import {useEffect, useState} from "react";
import {ProgramMetadata} from "@gear-js/api";
import {useAccount, useAlert, useApi} from "@gear-js/react-hooks";
import {web3FromSource} from "@polkadot/extension-dapp";
import {BlobServiceClient} from "@azure/storage-blob";
import {AZURE, PROGRAMS} from "../../consts";

const NewPost = () => {
	const alert = useAlert();
	const [selectedImg, setSelectedImg] = useState<File | null>(null);
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const { accounts, account } = useAccount();
	const { api } = useApi();

	const metadata = ProgramMetadata.from(PROGRAMS.THREAD.META);

	const message: any = {
		destination: PROGRAMS.THREAD.ID,
		payload: {
			NewThread: {
				// TODO: handle id generation
				id: "2",
				// TODO: Change for actual state variable of post type
				threadType: "Question",
				title: Title,
				content: Content,
				photoUrl: photoUrl
			},
		},
		gasLimit: 2099819245,
		value: 0,
	};

	const uploadPic = async () => {
		let storageAccountName = 'postpictures';
		let sasToken = AZURE.BLOB_STORAGE_SAS;
		const blobService = new BlobServiceClient(
			`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
		)

		const containerClient = blobService.getContainerClient('postpictures');
		await containerClient.createIfNotExists({
			access: 'container'
		})
		const blobClient = containerClient.getBlockBlobClient(selectedImg?.name as string);

		const options = {
			blobHTTPHeaders: {
				blobContentType: selectedImg?.type
			}
		}

		await blobClient.uploadData(selectedImg as File, options);
		setPhotoUrl(blobClient.url);
	}

	const signer = async () => {
		const localaccount = account?.address;
		const isVisibleAccount = accounts.some(
			(visibleAccount) => visibleAccount.address === localaccount
		);

		if (isVisibleAccount) {
			// Create a message extrinsic
			const transferExtrinsic = await api.message.send(message, metadata);

			const injector = await web3FromSource(accounts[0].meta.source);

			transferExtrinsic
				.signAndSend(
					account?.address ?? alert.error("No account"),
					{ signer: injector.signer },
					({ status }) => {
						if (status.isInBlock) {
							alert.success("Status");
						} else {
							console.log("transaction in Process");
							if (status.type === "Finalized") {
								alert.success(status.type);
							}
						}
					}
				)
				.catch((error: any) => {
					console.log(":( transaction failed", error);
				});
		} else {
			alert.error("Account not available to sign");
		}
		resetInputs();
	};

	const resetInputs = () => {
		setTitle('');
		setContent('');
		setSelectedImg(null);
		setPhotoUrl('');
	}

	const handleImgChange = (e: any) => {
		const imgFile = e.target.files[0];
		if (imgFile && imgFile.type.startsWith('image/')) {
			setSelectedImg(imgFile);
		} else {
			setSelectedImg(null);
		}
	}

	useEffect(() => {
		const handlePhotoUrlChange = async () => {
			if (photoUrl !== "") {
				await signer();
			}
		};
		handlePhotoUrlChange();
	}, [photoUrl]);

	return (
		<>
			<div className={"new-post-container"}>
				<div className={"form-container"}>
					<div id={"upper-section"}>
						<input className={"new-post-input"} id={"post-title"} type={"text"} name={"post-title"} placeholder={"Title"} value={Title} required={true} onChange={(e) => {
							setTitle(e.target.value)
						}}/>
						<button id={"add-tags-btn"}>Add Tags</button>
						<textarea name={"content"} placeholder={"Content (optional)"} id={"content-input"} className={"new-post-input"} value={Content} onChange={(e) => {
							setContent(e.target.value)
						}}/>
					</div>
					<div id={"lower-section"}>
						<div className={"photo-input-container"}>
							<input type={"file"} id={"photo-input"} name={"image"} onChange={handleImgChange}/>
							<label htmlFor={"photo-input"} className={"photo-label"}>
								<div id={"photo-upload-icon"}></div>
							</label>
							{selectedImg && <p>{selectedImg.name}</p>}
						</div>
						<button id={"publish-post-btn"} onClick={async () => {
							await uploadPic();
						}}>
							<p className={"publish-post-btn-text"}>Publish</p>
							<div className={"add-post-svg"}></div>
						</button>
					</div>
				</div>
			</div>
			<NavBar/>
		</>
	)
}

export default NewPost;
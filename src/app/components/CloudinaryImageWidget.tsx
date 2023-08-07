import { Box, Button, Input, Text } from "@chakra-ui/react";
import Script from "next/script";
import { MdPhoto } from "react-icons/md";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { envConfigs } from "@/lib/env-config";
import { useCloudUploadImageMutation } from "@/state/services/cloudinary-api";

const CloudinaryImageWidget = ({
  showLoadingText = true,
  getUploadData = ({
    fileUrl = "",
    data = {},
    isLoading = false,
    isError = false,
  }: {
    fileUrl: string;
    data: any;
    isLoading: boolean;
    isError: boolean;
  }) => {},
}) => {
  const [] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTrigger, { data, isLoading, isError }] =
    useCloudUploadImageMutation();
  const formdata = new FormData();

  useEffect(() => {
    setFileUrl(data?.secure_url);
    getUploadData({ fileUrl, data, isError, isLoading });

    console.log({ fileUrl, data, isError, isLoading });
  }, [fileUrl, getUploadData, data, isError, isLoading]);

  function handleInputClick() {
    inputRef.current?.click();
  }
  async function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    const { files } = evt.target;
    if (!files?.length) {
      return;
    }
    try {
      setIsUploading(true);
      const file = files[0];
      formdata.append("file", file as File);
      formdata.append(
        "upload_preset",
        envConfigs.cloudinary.preset || "hackhost",
      );
      await uploadTrigger({ data: formdata });
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);

      console.log("error uploading image", err);
    }
  }
  return (
    <Box>
      <Input
        hidden
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        ref={inputRef}
      />
      <Button
        onClick={handleInputClick}
        colorScheme="purple"
        isLoading={isUploading}
        loadingText={showLoadingText ? "uploading..." : undefined}
      >
        <MdPhoto /> <Text ml={2}>Choose Photo</Text>
      </Button>
    </Box>
  );
};

export default CloudinaryImageWidget;

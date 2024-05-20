"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import { UploadButton } from "@/utils/uploadthing";

interface ImageUploadProps {
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value }) => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Product Image"
          width={150}
          height={200}
          priority={true}
        />
      )}
      <UploadButton
        className="flex justify-start items-start"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          // I need to save the uploaded file url + key to the database

          // console.log("Files: ", res);
          // gives image url
          setImageUrl(res[0].url);

          toast.success("Uploaded image successfully");
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
};
export default ImageUpload;

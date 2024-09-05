"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox } from "lucide-react";
import React, { Fragment, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import Loader from "./ui/Loader";
import { useRouter } from "next/navigation";
type Props = {};

const FileUpload = () => {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("please upload smaller than 10MB");
        return;
      }

      try {
        setUploading(true);

        const data = await uploadToS3(file);

        if (!data?.file_key || !data?.file_name) {
          toast.error("something went wrong");
          return;
        }

        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success("Chat has been created");
            router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            console.log(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-2xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-cneter items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <Fragment>
          <Inbox className="w-10 h-10 text-blue-500" />
          <Loader
            flags={[uploading, isLoading]}
            text=" Spilling Tea to GPT..."
          />
          <p className="text-sm text-slate-400">Drop PDF Here</p>
        </Fragment>
      </div>
    </div>
  );
};

export default FileUpload;

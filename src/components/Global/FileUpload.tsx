import React, { useState, useRef } from 'react';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from 'react-icons/fa';

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    // Append new files to the existing ones using concat
    const newFiles = files.concat(selectedFiles);
    setFiles(newFiles);

    // Initialize progress for new files
    const initialProgress = new Array(newFiles.length).fill(0);
    setUploadProgress(initialProgress);
    simulateUpload();
  };

  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) =>
        prevProgress.map((prog) => (prog < 100 ? prog + 10 : 100))
      );
      setUploadProgress((prevProgress) => {
        if (prevProgress.every((prog) => prog === 100)) {
          clearInterval(interval);
        }
        return prevProgress;
      });
    }, 500);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const openFileManager = () => {
    fileInputRef.current?.click();
  };

  // Determine the icon based on file type
  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (file.type.includes('word')) return <FaFileWord className="text-blue-500" />;
    if (file.type.includes('image')) return <FaFileImage className="text-green-500" />;
    return <FaFileAlt className="text-gray-500" />;
  };

  return (
    <div className="p-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer text-center"
      >
        <p className="text-lg">
          <span className="font-semibold">Drag and drop</span> files here or tap to upload
        </p>
        <p className="text-sm text-gray-500">Accepted file types: JPEG, Doc, PDF, PNG</p>
        <button onClick={openFileManager} className="btn btn-primary mt-3 w-full">Upload</button>
        <input 
          type="file" 
          ref={fileInputRef} 
          multiple 
          className="hidden" 
          onChange={handleFileSelect} 
        />
      </div>

      <div className="mt-4">
        <p className="font-semibold text-gray-600">{files.length} file(s) selected</p>

        {files.map((file, index) => (
          <div key={file.name} className="my-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="flex items-center gap-2">
                  {getFileIcon(file)}
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-gray-500">{Math.round(file.size / (1024 * 1024))} mb</span>
                </p>
              </div>
            </div>
            <div className="flex ml-2 mt-2">
                {uploadProgress[index] === 100 ? (
                  <span className="text-green-500">✔</span>
                ) : (
                  <span className="text-gray-400">⏳</span>
                )}
                <div className="w-full ml-2 mt-2">
                <div className="bg-gray-200 rounded-full h-2 w-full">
                  <div
                    className={`h-2 rounded-full ${uploadProgress[index] === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${uploadProgress[index]}%` }}
                  ></div>
                </div>
              </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

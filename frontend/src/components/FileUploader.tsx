import React, { useState, DragEvent, ChangeEvent } from 'react';

interface FileUploaderProps {
  allowedTypes?: string[]; // e.g., ['image/png', 'application/pdf']
  onUpload: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  allowedTypes = [],
  onUpload,
}) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    validateFiles(droppedFiles);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    validateFiles(selectedFiles);
  };

  const validateFiles = (files: File[]) => {
    const invalidFiles = files.filter(
      (file) => allowedTypes.length && !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError(`Unsupported file type: ${invalidFiles[0].name}`);
    } else {
      setError(null);
      onUpload(files);
    }
  };

  const uploaderStyles = {
    container: {
      border: '2px dashed #aaa',
      borderRadius: '8px',
      padding: '1rem',
      textAlign: 'center',
      transition: 'border-color 0.3s ease',
      cursor: 'pointer',
      backgroundColor: dragging ? '#e0f7fa' : 'white',
      borderColor: dragging ? '#26c6da' : '#aaa',
    } as React.CSSProperties,
    input: {
      display: 'none',
    } as React.CSSProperties,
    error: {
      color: 'red',
      marginTop: '0.5rem',
    } as React.CSSProperties,
  };

  return (
    <div>
      <div
        style={uploaderStyles.container}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <p>Drag and drop files here, or click to select files</p>
        <input
          id="fileInput"
          type="file"
          style={uploaderStyles.input}
          multiple
          onChange={handleFileChange}
        />
      </div>
      {error && <p style={uploaderStyles.error}>{error}</p>}
    </div>
  );
};

export default FileUploader;

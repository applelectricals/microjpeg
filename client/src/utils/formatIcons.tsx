// Format icons using Lucide icons instead of large image files
import { FileImage, Image, FileType, Layers, Camera, Code } from 'lucide-react';

export const getFormatIcon = (format: string) => {
  const iconClassName = "w-6 h-6";
  
  switch (format.toLowerCase()) {
    case 'jpeg':
    case 'jpg':
      return <FileImage className={`${iconClassName} text-blue-600`} />;
    case 'png':
      return <Image className={`${iconClassName} text-green-600`} />;
    case 'webp':
      return <FileType className={`${iconClassName} text-purple-600`} />;
    case 'avif':
      return <Layers className={`${iconClassName} text-orange-600`} />;
    case 'tiff':
      return <FileImage className={`${iconClassName} text-gray-600`} />;
    case 'svg':
      return <Code className={`${iconClassName} text-red-600`} />;
    default:
      return <Camera className={`${iconClassName} text-gray-500`} />;
  }
};

export const getFormatColor = (format: string) => {
  switch (format.toLowerCase()) {
    case 'jpeg':
    case 'jpg':
      return 'blue';
    case 'png':
      return 'green';
    case 'webp':
      return 'purple';
    case 'avif':
      return 'orange';
    case 'tiff':
      return 'gray';
    case 'svg':
      return 'red';
    default:
      return 'gray';
  }
};
import { useState } from "react";
import ImageUpload from "../ImageUpload";

export default function ImageUploadExample() {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUploaded = (url: string) => {
    console.log("Image uploaded:", url);
    setImageUrl(url);
  };

  return (
    <div className="p-6">
      <ImageUpload
        currentImageUrl={imageUrl}
        onImageUploaded={handleImageUploaded}
        initials="أح"
      />
      {imageUrl && (
        <p className="mt-4 text-sm text-muted-foreground">
          URL: {imageUrl}
        </p>
      )}
    </div>
  );
}

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  initials: string;
}

export default function ImageUpload({ currentImageUrl, onImageUploaded, initials }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "خطأ",
          description: "يرجى اختيار صورة صالحة",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "خطأ",
          description: "حجم الصورة كبير جداً (الحد الأقصى 5MB)",
          variant: "destructive",
        });
        return;
      }

      setUploading(true);

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);

      toast({
        title: "تم رفع الصورة",
        description: "تم رفع الصورة بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في رفع الصورة",
        description: error.message || "حدث خطأ أثناء رفع الصورة",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onImageUploaded('');
  };

  return (
    <div className="flex items-center gap-4" data-testid="container-image-upload">
      <Avatar className="h-20 w-20 border-2 border-muted">
        {previewUrl && <AvatarImage src={previewUrl} alt="صورة المشرف" />}
        <AvatarFallback className="text-2xl font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="input-file"
        />
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          data-testid="button-upload"
          className="gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري الرفع...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              رفع صورة
            </>
          )}
        </Button>

        {previewUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            data-testid="button-remove"
            className="gap-2"
          >
            <X className="h-4 w-4" />
            إزالة
          </Button>
        )}

        <p className="text-xs text-muted-foreground">
          PNG, JPG (حد أقصى 5MB)
        </p>
      </div>
    </div>
  );
}

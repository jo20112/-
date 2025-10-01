import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface AddAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (name: string, avatarUrl?: string) => void;
}

export default function AddAdminDialog({ open, onOpenChange, onAdd }: AddAdminDialogProps) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), avatarUrl || undefined);
      setName("");
      setAvatarUrl("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-add-admin">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            إضافة مشرف جديد
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right block">
                اسم المشرف
              </Label>
              <Input
                id="name"
                placeholder="أدخل اسم المشرف"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-right"
                data-testid="input-admin-name"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label className="text-right block">
                صورة المشرف (اختياري)
              </Label>
              <ImageUpload
                currentImageUrl={avatarUrl}
                onImageUploaded={setAvatarUrl}
                initials={name.split(" ").map(n => n[0]).join("") || "؟"}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              إلغاء
            </Button>
            <Button type="submit" data-testid="button-submit">
              إضافة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

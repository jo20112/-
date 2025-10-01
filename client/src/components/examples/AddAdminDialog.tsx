import { useState } from "react";
import AddAdminDialog from "../AddAdminDialog";
import { Button } from "@/components/ui/button";

export default function AddAdminDialogExample() {
  const [open, setOpen] = useState(false);

  const handleAdd = (name: string) => {
    console.log("Adding admin:", name);
  };

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>فتح النافذة</Button>
      <AddAdminDialog open={open} onOpenChange={setOpen} onAdd={handleAdd} />
    </div>
  );
}

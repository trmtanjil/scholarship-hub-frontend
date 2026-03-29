"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  onDelete: () => Promise<void>;
  itemName: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  onDelete,
  itemName,
  disabled = false,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onDelete();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* 🔥 IMPORTANT FIX: Trigger NEVER disabled */}
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            application for{" "}
            <span className="font-semibold text-slate-900">
              {itemName}
            </span>.
          </AlertDialogDescription>

          {/* 🚫 Pending না হলে warning */}
          {disabled && (
            <p className="text-sm text-red-500 mt-2">
              You can only delete applications with <b>Pending</b> status.
            </p>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={disabled || isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
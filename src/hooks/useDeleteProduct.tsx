import { deleteProduct } from "@/lib/actions/actions";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(id: string) {
    setIsDeleting(true);
    try {
      const result = await deleteProduct(id);

      if (!result.success) {
        toast.error("Delete failed", {
          description:
            result.message ||
            "An error occurred while trying to remove this item.",
        });
      } else {
        toast.success("Item deleted", {
          description:
            result.message || "The item was removed from your watchlist.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error", {
        description:
          "Something went wrong while deleting. Please try again later.",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return { isDeleting, handleDelete };
}

export default useDeleteProduct;

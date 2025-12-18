import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignInGoogle from "./sign-in-google";

function Modal(props: ModalProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
          <DialogDescription>
            Sign in with your Google account to access all features and save
            your bookmarks.
          </DialogDescription>
        </DialogHeader>
        <SignInGoogle />
      </DialogContent>
    </Dialog>
  );
}

export default Modal;

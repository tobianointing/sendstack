import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { LuBox } from "react-icons/lu";
import { GetAddressForm } from "../GetAddressForm";

export const SendPackageDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="flex items-center gap-2">
            <LuBox className="w-6 h-6" />
            <span>Send Package</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <GetAddressForm />
      </DialogContent>
    </Dialog>
  );
};

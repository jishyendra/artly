import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function PostControls({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full justify-around gap-2", className)}>
      <button>Like</button>
      <button>Share</button>
      <Dialog>
        <DialogTrigger>Send Gift</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Gift</DialogTitle>
            <div className="grid gap-2">
              <i>You can send gifts to the artist to show your appreciation</i>
              <div className="mt-2 grid gap-2">
                <div className="grid">
                  <Label htmlFor="btc-address">BTC(Bitcoin) Address</Label>
                  <code id="btc-address">
                    1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                  </code>
                </div>
                <div className="grid">
                  <Label htmlFor="eth-address">Eth(Etherium) Address</Label>
                  <code id="eth-address">
                    0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                  </code>
                </div>
                <div className="grid">
                  <Label htmlFor="litecoin-address">
                    LTC(Litecoin) Address
                  </Label>
                  <code id="litecoin-address">
                    LZ1Q2W3E4R5T6Y7U8I9O0P1A2S3D4F5G6H7J8K9L
                  </code>
                </div>
              </div>
              <form action={giftRecieved}>
                <Input
                  name="transactionId"
                  type="text"
                  required
                  placeholder="Enter transaction id"
                ></Input>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <button>Collect</button>
    </div>
  );
}

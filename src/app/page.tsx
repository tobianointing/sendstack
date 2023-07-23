import { SendPackageDialog } from "@/features/Home/components/SendPackageDialog";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Image
        src={"/sammy-line-delivery.gif"}
        width={400}
        height={300}
        alt="Home banner"
      />
      <SendPackageDialog />
    </main>
  );
}

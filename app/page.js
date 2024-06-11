import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
  <div className="flex justify-between items-center">
    <Button>Left</Button>
    <Button>Right</Button>
  </div>
  );
}

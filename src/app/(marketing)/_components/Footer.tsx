import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="flex items-center w-full p-6 bg-background z-50">
        <p className="whitespace-nowrap">
        Notes-Pad
        </p>
      <div className="md:ml-auto w-full justify-center md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant={"ghost"} size={"sm"}>
          Privacy Policy
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
};

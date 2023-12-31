"use client";
import { api } from "@/../convex/_generated/api";

// icons
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";

//hooks and react
import { useMediaQuery } from "usehooks-ts";
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";

// COmponents
import { UserItem } from "@/app/(main)/_components/UserItem";
import { Item } from "@/app/(main)/_components/Item";
import { toast } from "sonner";
import { DocumentList } from "@/app/(main)/_components/DocumentList";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { TrashBox } from "@/app/(main)/_components/trashbox";
import { useSettings } from "@/hooks/useSettings";
import { useSearch } from "@/hooks/useSearch";
import { NavBar } from "@/app/(main)/_components/navbar";

// Sidebar component
export const Navigation = () => {
  // calling for hooks
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.document.create)
  const settings = useSettings()
  const search = useSearch()
  const params = useParams()

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  // UseEffect to make sidebar fill all the screen while is mobile screen
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);
  // function responsable to resize the sidebar
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    // take a width value of actual sidebar
    let newWidth = e.clientX;

    // set a max and min value for sidebar width
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    // setting sidebar width value in line with draggin with mouse
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  // remove event of resize
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Reset sidebar width for default value
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "cacl(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // set sidebar width to 0 making desappear
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({title: 'Untitled'})
  
    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created.',
      error: 'Failed to reate a new note.'
    })
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen}/>
          <Item label="Settings" icon={Settings} onClick={settings.onOpen}/>
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
            <DocumentList />
            <Item onClick={handleCreate} icon={Plus} label="Add a page" />
            <Popover>
                <PopoverTrigger className="w-full mt-4">
                  <Item label="Trash" icon={Trash} />
                </PopoverTrigger>
                <PopoverContent side={isMobile ? 'bottom' : 'right'}>
                  <TrashBox />
                </PopoverContent>
            </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
       {!!params.documentId ? (
          <NavBar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
          </nav>
        )}
        
      </div>
    </>
  );
};
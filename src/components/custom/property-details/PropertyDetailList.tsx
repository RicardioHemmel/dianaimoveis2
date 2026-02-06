"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, X, Building2, Trash2, AlertTriangle } from "lucide-react";
import type ServerActionResponse from "@/lib/types/server-action-response";

type LinkedProperty = {
  _id: string;
  title: string;
  imageUrl?: string;
};

export type DetailItem = {
  _id: string;
  name: string;
  linkedProperties: LinkedProperty[];
};

type PropertyDetailListCopy = {
  headerTitle: (count: number) => string;
  searchPlaceholder: string;
  filterAllLabel: string;
  filterLinkedLabel: string;
  filterUnlinkedLabel: string;
  emptyTitle: string;
  emptyHint?: string;
  deleteTitle: (name: string) => string;
  deleteLinkedWarning: (count: number) => string;
  deleteLinkedDescription: string;
  deleteSafeDescription: string;
  deleteErrorMessage: string;
  deleteErrorFallback: string;
};

type PropertyDetailListProps = {
  items: DetailItem[];
  deleteAction: (id: string) => Promise<ServerActionResponse>;
  copy: PropertyDetailListCopy;
  emptyIcon: LucideIcon;
};

export function PropertyDetailList({
  items,
  deleteAction,
  copy,
  emptyIcon: EmptyIcon,
}: PropertyDetailListProps) {
  const [itemsList, setItemsList] = useState<DetailItem[]>(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    item: DetailItem | null;
  }>({
    isOpen: false,
    item: null,
  });
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [filterType, setFilterType] = useState<"all" | "linked" | "not-linked">(
    "all",
  );
  const selectedItem = deleteDialog.item;
  const linkedProperties = selectedItem?.linkedProperties ?? [];
  const hasLinkedProperties = linkedProperties.length > 0;

  useEffect(() => {
    setItemsList(items);
  }, [items]);

  const filteredItems = itemsList.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "linked" && item.linkedProperties.length > 0) ||
      (filterType === "not-linked" && item.linkedProperties.length === 0);
    return matchesSearch && matchesFilter;
  });

  const handleDelete = () => {
    if (!deleteDialog.item || isDeleting) return;

    const item = deleteDialog.item;
    setIsDeleting(true);

    deleteAction(item._id)
      .then((res) => {
        if (!res.success) {
          toast.error(res.message || copy.deleteErrorMessage);
          return;
        }

        setItemsList(itemsList.filter((c) => c._id !== item._id));
        toast.success(`"${item.name}" removido com sucesso.`);
        handleDeleteDialogChange(false);
        router.refresh();
      })
      .catch(() => {
        toast.error(copy.deleteErrorFallback);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const openDeleteDialog = (item: DetailItem) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDeleteDialog({ isOpen: true, item });
  };

  const handleDeleteDialogChange = (isOpen: boolean) => {
    if (isOpen) {
      setDeleteDialog((prev) => ({ ...prev, isOpen: true }));
      return;
    }

    setDeleteDialog((prev) => ({ ...prev, isOpen: false }));

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setDeleteDialog((prev) => ({ ...prev, item: null }));
      closeTimeoutRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Card className="lg:col-span-2 white-card">
        <CardHeader className="sticky top-15 z-10 bg-white backdrop-blur border-b pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">
                {copy.headerTitle(items.length)}
              </CardTitle>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={copy.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                className={
                  filterType === "all"
                    ? "bg-nav-bg-active border-nav-bg-active text-white"
                    : "border bg-gray-50 text-black"
                }
                size="sm"
                onClick={() => setFilterType("all")}
              >
                {copy.filterAllLabel}
              </Button>
              <Button
                className={
                  filterType === "linked"
                    ? "bg-nav-bg-active border-nav-bg-active text-white"
                    : "border bg-gray-50 text-black"
                }
                size="sm"
                onClick={() => setFilterType("linked")}
              >
                {copy.filterLinkedLabel}
              </Button>
              <Button
                className={
                  filterType === "not-linked"
                    ? "bg-nav-bg-active border-nav-bg-active text-white"
                    : "border bg-gray-50 text-black"
                }
                size="sm"
                onClick={() => setFilterType("not-linked")}
              >
                {copy.filterUnlinkedLabel}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="flex justify-center items-center bg-gray-400 p-4 rounded-full w-fit mx-auto mb-4">
                <EmptyIcon className="size-10 text-white" />
              </div>
              <p>{copy.emptyTitle}</p>
              {searchTerm && copy.emptyHint && (
                <p className="text-sm mt-1">{copy.emptyHint}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex gap-4">
                    {item.linkedProperties.length > 0 && (
                      <Badge className="text-xs bg-admin-primary">
                        <Building2 className="size-4 mr-1" />
                        {item.linkedProperties.length}{" "}
                        {item.linkedProperties.length !== 1
                          ? " imóveis"
                          : " imóvel"}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive bg-destructive/10 hover:text-destructive hover:bg-destructive/10"
                      onClick={() => openDeleteDialog(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={deleteDialog.isOpen && !!selectedItem}
        onOpenChange={handleDeleteDialogChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {hasLinkedProperties ? (
                <AlertTriangle className="size-5 text-amber-500" />
              ) : (
                <Trash2 className="size-5 text-destructive" />
              )}
              {copy.deleteTitle(selectedItem?.name ?? "")}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                {hasLinkedProperties ? (
                  <>
                    <p className="text-amber-600 dark:text-amber-500 font-medium">
                      {copy.deleteLinkedWarning(linkedProperties.length)}
                    </p>
                    <p className="text-sm">{copy.deleteLinkedDescription}</p>
                    <ul className="bg-muted rounded-lg p-3 space-y-1">
                      {linkedProperties.map((property) => (
                        <li key={property._id}>
                          <Link
                            className="flex items-center gap-2 text-sm"
                            target="_blank"
                            href={`/properties/${property._id}/edit`}
                          >
                            {property.imageUrl ? (
                              <Image
                                src={property.imageUrl}
                                alt={property.title}
                                width={80}
                                height={80}
                                className="size-12 rounded-md object-cover"
                              />
                            ) : (
                              <div className="size-12 rounded-md bg-background border flex items-center justify-center">
                                <Building2 className="size-4" />
                              </div>
                            )}
                            <span className="truncate font-semibold">
                              {property.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>{copy.deleteSafeDescription}</p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/70 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

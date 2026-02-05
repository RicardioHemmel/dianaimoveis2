"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
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
import {
  Search,
  Plus,
  Trash2,
  Sparkles,
  X,
  AlertTriangle,
  Building2,
} from "lucide-react";

interface Comodidade {
  id: string;
  nome: string;
  imoveisVinculados: { id: string; nome: string }[];
}

const comodidadesMock: Comodidade[] = [
  {
    id: "1",
    nome: "Piscina",
    imoveisVinculados: [
      { id: "1", nome: "Apartamento Vila Madalena" },
      { id: "2", nome: "Casa Moema" },
    ],
  },
  {
    id: "2",
    nome: "Churrasqueira",
    imoveisVinculados: [{ id: "1", nome: "Apartamento Vila Madalena" }],
  },
  { id: "3", nome: "Academia", imoveisVinculados: [] },
  {
    id: "4",
    nome: "Salão de Festas",
    imoveisVinculados: [{ id: "3", nome: "Cobertura Jardins" }],
  },
  { id: "5", nome: "Playground", imoveisVinculados: [] },
  {
    id: "6",
    nome: "Quadra Poliesportiva",
    imoveisVinculados: [
      { id: "2", nome: "Casa Moema" },
      { id: "4", nome: "Apartamento Pinheiros" },
    ],
  },
  { id: "7", nome: "Sauna", imoveisVinculados: [] },
  {
    id: "8",
    nome: "Espaço Gourmet",
    imoveisVinculados: [{ id: "1", nome: "Apartamento Vila Madalena" }],
  },
  { id: "9", nome: "Brinquedoteca", imoveisVinculados: [] },
  {
    id: "10",
    nome: "Lavanderia",
    imoveisVinculados: [{ id: "5", nome: "Studio Consolação" }],
  },
];

export default function AmenitiesPage() {
  const [comodidades, setComodidades] = useState<Comodidade[]>(comodidadesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [novaComodidade, setNovaComodidade] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    comodidade: Comodidade | null;
  }>({
    open: false,
    comodidade: null,
  });
  const [filterType, setFilterType] = useState<
    "todas" | "vinculadas" | "sem-vinculo"
  >("todas");

  const filteredComodidades = comodidades.filter((c) => {
    const matchesSearch = c.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "todas" ||
      (filterType === "vinculadas" && c.imoveisVinculados.length > 0) ||
      (filterType === "sem-vinculo" && c.imoveisVinculados.length === 0);
    return matchesSearch && matchesFilter;
  });

  const handleAddComodidade = () => {
    if (!novaComodidade.trim()) {
      toast("Digite o nome da comodidade.");
      return;
    }

    const exists = comodidades.some(
      (c) => c.nome.toLowerCase() === novaComodidade.trim().toLowerCase(),
    );

    if (exists) {
      toast("Uma comodidade com esse nome já está cadastrada.");
      return;
    }

    const newComodidade: Comodidade = {
      id: Date.now().toString(),
      nome: novaComodidade.trim(),
      imoveisVinculados: [],
    };

    setComodidades([...comodidades, newComodidade]);
    setNovaComodidade("");
    toast(`"${newComodidade.nome}" foi adicionada com sucesso.`);
  };

  const handleDeleteComodidade = () => {
    if (!deleteDialog.comodidade) return;

    setComodidades(
      comodidades.filter((c) => c.id !== deleteDialog.comodidade!.id),
    );
    toast(`"${deleteDialog.comodidade.nome}" foi removida com sucesso.`);
    setDeleteDialog({ open: false, comodidade: null });
  };

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulário de cadastro */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Nova Comodidade
            </CardTitle>
            <CardDescription>
              Adicione uma nova comodidade ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Ex: Piscina aquecida"
                  value={novaComodidade}
                  onChange={(e) => setNovaComodidade(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddComodidade();
                    }
                  }}
                />
              </div>
              <Button onClick={handleAddComodidade} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Comodidade
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de comodidades */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Comodidades Cadastradas</CardTitle>
                <CardDescription>
                  {comodidades.length} comodidade
                  {comodidades.length !== 1 ? "s" : ""} no total
                </CardDescription>
              </div>
            </div>

            {/* Busca e filtros */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar comodidade..."
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
                  variant={filterType === "todas" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("todas")}
                >
                  Todas
                </Button>
                <Button
                  variant={filterType === "vinculadas" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("vinculadas")}
                >
                  Com imóveis
                </Button>
                <Button
                  variant={filterType === "sem-vinculo" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("sem-vinculo")}
                >
                  Sem vínculo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredComodidades.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Nenhuma comodidade encontrada</p>
                {searchTerm && (
                  <p className="text-sm mt-1">
                    Tente ajustar os termos da busca
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredComodidades.map((comodidade) => (
                  <div
                    key={comodidade.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{comodidade.nome}</span>
                      {comodidade.imoveisVinculados.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          <Building2 className="h-3 w-3 mr-1" />
                          {comodidade.imoveisVinculados.length} imóve
                          {comodidade.imoveisVinculados.length !== 1
                            ? "is"
                            : "l"}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() =>
                        setDeleteDialog({ open: true, comodidade })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({
            open,
            comodidade: open ? deleteDialog.comodidade : null,
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {deleteDialog.comodidade?.imoveisVinculados.length ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <Trash2 className="h-5 w-5 text-destructive" />
              )}
              Excluir "{deleteDialog.comodidade?.nome}"?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                {deleteDialog.comodidade?.imoveisVinculados.length ? (
                  <>
                    <p className="text-amber-600 dark:text-amber-500 font-medium">
                      Atenção! Esta comodidade está vinculada a{" "}
                      {deleteDialog.comodidade.imoveisVinculados.length} imóve
                      {deleteDialog.comodidade.imoveisVinculados.length !== 1
                        ? "is"
                        : "l"}
                      :
                    </p>
                    <ul className="bg-muted rounded-lg p-3 space-y-1">
                      {deleteDialog.comodidade.imoveisVinculados.map(
                        (imovel) => (
                          <li
                            key={imovel.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Building2 className="h-3 w-3 text-muted-foreground" />
                            {imovel.nome}
                          </li>
                        ),
                      )}
                    </ul>
                    <p className="text-sm">
                      Ao excluir, essa comodidade será removida automaticamente
                      de todos esses imóveis.
                    </p>
                  </>
                ) : (
                  <p>
                    Esta comodidade não está vinculada a nenhum imóvel e pode
                    ser excluída com segurança.
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComodidade}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

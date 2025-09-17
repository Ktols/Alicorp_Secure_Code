"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { Download, Search } from "lucide-react";
import { VULNERABLE_PACKAGES } from "@/lib/vulnerabilities";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { CardFooter } from "./ui/card";
import { PaginationControls } from "./pagination-controls";
import { CardDescription } from "./ui/card";
import { Input } from "./ui/input";

export default function VulnerablePackagesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  const handleExport = () => {
    const headers = ['Paquete', 'Versiones Vulnerables', 'Descripción'];
    const csvContent = [
      headers.join(','),
      ...VULNERABLE_PACKAGES.map(p => `"${p.name}","${p.versions}","${p.description}"`),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'paquetes-vulnerables.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return VULNERABLE_PACKAGES;
    }
    return VULNERABLE_PACKAGES.filter(pkg =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <CardDescription>
            Se encontraron {VULNERABLE_PACKAGES.length} paquetes vulnerables en la base de datos.
          </CardDescription>
        </div>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar a CSV
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre de paquete..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Paquete</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Versiones Vulnerables</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((pkg) => (
              <TableRow key={pkg.name}>
                <TableCell className="font-medium">{pkg.name}</TableCell>
                <TableCell className="text-muted-foreground">{pkg.description}</TableCell>
                <TableCell>
                    <div className="flex flex-wrap gap-1">
                        {(pkg.versions || '').split(',').map(version => (
                            <Badge key={version.trim()} variant="destructive">{version.trim()}</Badge>
                        ))}
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CardFooter className="px-0">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="w-full"
        />
      </CardFooter>
    </div>
  );
}

    
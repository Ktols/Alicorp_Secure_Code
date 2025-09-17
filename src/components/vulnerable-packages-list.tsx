"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { VULNERABLE_PACKAGES, type VulnerablePackage } from "@/lib/vulnerabilities";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { CardFooter } from "./ui/card";

export default function VulnerablePackagesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleExport = () => {
    const headers = ['Paquete', 'Versiones Vulnerables'];
    const csvContent = [
      headers.join(','),
      ...VULNERABLE_PACKAGES.map(p => `${p.name},"${p.versions.join(', ')}"`),
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

  const totalPages = Math.ceil(VULNERABLE_PACKAGES.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = VULNERABLE_PACKAGES.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar a CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Paquete</TableHead>
              <TableHead>Versiones Vulnerables</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((pkg: VulnerablePackage) => (
              <TableRow key={pkg.name}>
                <TableCell className="font-medium">{pkg.name}</TableCell>
                <TableCell>
                    <div className="flex flex-wrap gap-1">
                        {pkg.versions.map(version => (
                            <Badge key={version} variant="destructive">{version}</Badge>
                        ))}
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <CardFooter className="flex items-center justify-between pt-4 px-0">
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </CardFooter>
      )}
    </div>
  );
}

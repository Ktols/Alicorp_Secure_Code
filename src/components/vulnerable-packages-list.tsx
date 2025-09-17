"use client";

import { Download } from "lucide-react";
import { VULNERABLE_PACKAGES, type VulnerablePackage } from "@/lib/vulnerabilities";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

export default function VulnerablePackagesList() {
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

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar a CSV
        </Button>
      </div>
      <ScrollArea className="h-[60vh] rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>Nombre del Paquete</TableHead>
              <TableHead>Versiones Vulnerables</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VULNERABLE_PACKAGES.map((pkg: VulnerablePackage) => (
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
      </ScrollArea>
    </div>
  );
}

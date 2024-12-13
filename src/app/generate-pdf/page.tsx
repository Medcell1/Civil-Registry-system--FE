import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export const metadata: Metadata = {
  title: "Generate PDF",
  description: "Generate PDF documents for civil registry records.",
}

export default function GeneratePDFPage() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Generate PDF</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Generate PDF Document</CardTitle>
            <CardDescription>Select the type of document to generate.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birth">Birth Certificate</SelectItem>
                  <SelectItem value="marriage">Marriage Certificate</SelectItem>
                  <SelectItem value="death">Death Certificate</SelectItem>
                </SelectContent>
              </Select>
              <Button>Generate PDF</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


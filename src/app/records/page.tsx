import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"

export const metadata: Metadata = {
  title: "Record Management",
  description: "Manage birth, marriage, and death records.",
}

export default function RecordManagementPage() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Record Management</h2>
        </div>
        <Tabs defaultValue="births" className="space-y-4">
          <TabsList>
            <TabsTrigger value="births">Births</TabsTrigger>
            <TabsTrigger value="marriages">Marriages</TabsTrigger>
            <TabsTrigger value="deaths">Deaths</TabsTrigger>
          </TabsList>
          <TabsContent value="births" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Birth Records</CardTitle>
                <CardDescription>Manage birth records here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Add New Birth Record</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="marriages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Marriage Records</CardTitle>
                <CardDescription>Manage marriage records here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Add New Marriage Record</Button>
                {/* Add table or list of marriage records here */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deaths" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Death Records</CardTitle>
                <CardDescription>Manage death records here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Add New Death Record</Button>
                {/* Add table or list of death records here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


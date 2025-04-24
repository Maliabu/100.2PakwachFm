

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

//reusable drawer
type ReusableDrawerProps = {
    page: string
    form: React.JSX.Element
  }
  
  export function ReusableDrawer({
    page, 
    form,
  }: ReusableDrawerProps){
    return (
      <div className="w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="text-white">Add {page}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className=" px-16">
            <DrawerHeader>
              <DrawerTitle>Add New {page}</DrawerTitle>
              <DrawerDescription>Provide the details as required for {page}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              {form}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      </div>
    )
  }
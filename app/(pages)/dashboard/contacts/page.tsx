'use client'
import React, {useState, useEffect} from 'react'
import { DataTable } from '@/components/ui/data-table'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ContactForm from './_components/contact-form'
import { useRouter } from 'next/navigation'


type Props = {}

const Contacts = (props: Props) => {
  const [open, setOpen] = useState(false)
    const columns = [
        {
            accessorKey: 'firstName',
            header: 'First Name',
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
        },
        {
            accessorKey: 'address',
            header: 'Address',
        },
    ]

    const contacts = useQuery(api.contacts.getContacts)
    const router = useRouter()
    console.log(contacts)

    const handleDataLoad = () => {
      router.refresh()
    }

  return (
    <div className="flex flex-col gap-6 p-6">
    {/* Header */}
    <div className="flex flex-col justify-between gap-2">
    <div className="flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-semibold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground mt-2">Manage your contacts from the list below</p>
        </div>
        <Button onClick={handleDataLoad}>Load</Button>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add New Contact</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A New Contact</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
         <ContactForm onSuccess={() => setOpen(false)} />

        </div>
      </DialogContent>
        </Dialog>
    </div>
    </div>
    {!contacts ? (
      <div className="flex items-center justify-center h-[50vh]">
        <h1 className="text-xl font-semibold">No Contacts Created - Use Create Contacts Button to create one!</h1>
      </div>
    ) : (
      <DataTable columns={columns} data={contacts} />
    )}
    </div>

  )
}

export default Contacts
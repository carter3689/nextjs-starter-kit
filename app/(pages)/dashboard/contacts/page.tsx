'use client'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ContactForm from './_components/contact-form'

type Props = {}

const Contacts = (props: Props) => {
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
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
    console.log(contacts)

    const data = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            address: '123 Main St, City, Country',
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '9876543210',
            address: '456 Elm St, City, Country',
        },
        {
            id: '3',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            phone: '5555555555',
            address: '789 Oak St, City, Country',
        },
    ]
  return (
    <div className="flex flex-col gap-6 p-6">
    {/* Header */}
    <div className="flex flex-col justify-between gap-2">
    <div className="flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-semibold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground mt-2">Manage your contacts from the list below</p>
        </div>
        <Dialog>
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
         <ContactForm />

        </div>
      </DialogContent>
        </Dialog>
    </div>
    </div>
    <DataTable columns={columns} data={data} />
    </div>

  )
}

export default Contacts
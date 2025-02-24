'use client'
import React, { useState, useEffect} from 'react'
import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useRouter, usePathname } from 'next/navigation';

type Props = {}

const ContactDetail = ( ) => {
  const [contactId, setContactId] = useState<string>()
  const pathname = usePathname()

  useEffect(() => {
    const contactId = pathname.split('/').pop()
    setContactId(contactId)
  }, [pathname])

  const contactQuery = useQuery(api.contacts.getContact, { contactId: contactId as Id<"contacts"> })


  return (
    <div>{ contactQuery?.firstName }</div>
  )
}

export default ContactDetail
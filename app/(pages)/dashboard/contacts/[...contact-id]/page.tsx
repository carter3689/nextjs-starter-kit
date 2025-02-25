'use client'
import React, { useState, useEffect} from 'react'
import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Files } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Section } from '../_components/contact-section';

type Props = {}

const ContactDetail = ( ) => {
  const [contactId, setContactId] = useState<string>()
  const pathname = usePathname()

  useEffect(() => {
    const contactId = pathname.split('/').pop()
    setContactId(contactId)
  }, [pathname])

  const contactQuery = useQuery(api.contacts.getContact, { contactId: contactId as Id<"contacts"> })

  if (!contactQuery) return 

  return (
    <>
    <Section 
    firstName={contactQuery?.firstName}
    lastName={contactQuery?.lastName}
     />
  </>
  )
}

export default ContactDetail
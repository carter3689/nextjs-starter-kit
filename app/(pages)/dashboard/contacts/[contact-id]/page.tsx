'use client'
import React from 'react'
import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from 'next/router';

type Props = {}

const ContactDetail = (props: Props) => {
  const router = useRouter();
  const contactId = router.query.contactId
  console.log(contactId);
  return (
    <div>ContactDetail</div>
  )
}

export default ContactDetail
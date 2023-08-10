import React from 'react'
import { UserButton } from "@clerk/nextjs";

function RootPage() {
  return (
    <UserButton afterSignOutUrl="/"/>
  )
}

export default RootPage
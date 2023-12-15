"use client"

import React from 'react'
import { createAccount } from '../actions/usePayment'
import { TEST_ACCOUNT } from '../const/testUser'

function page() {
    const handleSubmit = async() => {
        try {
            await createAccount(TEST_ACCOUNT)
        }
        catch (e) {
            console.log(e)
        }
    }
  return (
    <div>
        <form action={handleSubmit}>
            <button>create account</button>
        </form>
    </div>
  )
}

export default page
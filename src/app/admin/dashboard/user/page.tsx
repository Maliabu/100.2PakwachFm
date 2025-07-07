/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { addUsers, checkEmailPhone } from "@/server/fetch.actions"
import { addUserSchema } from '@/schema/schema'
import { handleEncryption, togglePasswordVisibility2, token, tokenise, username } from "@/services/services"
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react"
import Image from "next/image"
import Account from '@/app/images/_ (10).jpeg'

export default function AddUser() {
  const [id, setId] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Sign Up User");


    React.useEffect(() => {
        setId(tokenise()[3])
    }, [])

    const form = useForm<z.infer<typeof addUserSchema>>({
      resolver: zodResolver(addUserSchema),
        defaultValues: {
          name: "",
          email: "",
          token: "",
          username: "",
          userType: "",
          phone: "",
          profilePicture: '',
          password: "",
          confirmPassword: "",
          decInit: "",
          encrPass: "",
          userId: id
      },
    })

    const name = form.getValues("name")
    form.setValue("token", token())
    name.length > 0?form.setValue("username", username(name)[0]+String(Math.floor((Math.random() * 100) + 1))+username(name)[1]):form.setValue("username", "")
    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev);
    };
     
    async function onSubmit(values: z.infer<typeof addUserSchema>) {  
      values.userId = tokenise()[3]
      
      setButtonText("Adding User...Please wait...")
      const checkUniqueData = await checkEmailPhone(values.email, values.phone)

      if(checkUniqueData.message == "good"){
        if(values.encrPass !== "" && values.encrPass === values.confirmPassword){
        // encrypt password
        const encr = handleEncryption(values.encrPass)
        values.password = (await encr).encryptedData
        values.decInit = (await encr).initVector
      }
      values.image?values.profilePicture = values.image.name:null
        //create obj

        const formData = new FormData()
        formData.append("file", values.image)
        formData.append('folder', 'users')

        const data = await addUsers(values, formData)
        if(data?.error){
          form.setError("root", {
            "message": "user not added"
          })
        } else {
          setLoginSuccess(true)
          setButtonText('Successful')
          window.location.reload()
        }
      } else {
        form.setError("root", {
          "message": checkUniqueData.message
        })
      }
    }

  return (
    <div className=" bg-secondary rounded-lg">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" sm:p-8 p-6">
      <div className="text-2xl font-bold tracking-tight">Add New Dashboard User</div>
        <div className="grid items-center mt-4 bg-background rounded-lg">
          <div className="grid sm:grid-cols-2 gap-2">
              <div className="flex flex-col p-8 gap-4">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                          <Input 
                          type="text" 
                          placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger id="userType">
                              <SelectValue placeholder="User"/>
                              </SelectTrigger>
                              <SelectContent position="popper" className=" font-[family-name:var(--font-futura)]">
                              <SelectItem value="guest">Guest User</SelectItem>
                              <SelectItem value="admin">Admin User</SelectItem>
                              <SelectItem value="staff">Staff User</SelectItem>
                              </SelectContent>
                          </Select>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                          <Input type="number" placeholder="phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <div className="flex justify-between">
              <FormField
                  control={form.control}
                  name="encrPass"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                          <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="ml-2 p-2 border rounded-md"
                    >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    </div>
              <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                          <Input type={showPassword ? "text" : "password"} placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl
                      >
                          <Input type="file" {...fieldProps} onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }/>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className="flex flex-col h-full">
              <div className="flex-1 relative">
                <Image
                alt="logo"
                src={Account}
                fill
                className="object-cover"
                unoptimized
                />
                </div>
              </div>
          </div>
        </div>
        <Button id="submit" className="my-4" type="submit">{buttonText}</Button>
        {form.formState.errors.root && (
                <div className="rounded text-sm font-bold bg-red-400/10 flex justify-center gap-4 text-red-600 p-2"><XCircle/> {form.formState.errors.root.message}</div>
            )}
            {loginSuccess && (
            <div className="rounded text-sm font-bold bg-green-400/10 flex justify-center gap-4 text-green-600 p-2">
                <CheckCircle className="animate-pulse"/> Successfully added user
            </div>
            )}
      </form>
      </Form>
        </div>
  )
}
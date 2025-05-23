/* eslint-disable @next/next/no-img-element */
"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { loginUser } from "@/server/fetch.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { redirect } from "next/navigation"
import { handleDecryption, togglePasswordVisibility } from "@/services/services"
import { EyeOff} from "lucide-react"
import { loginUserSchema } from "@/schema/schema"
import Logo from '../images/logo (1).png'
import Image from "next/image"

export default function Login(){

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
          defaultValues: {
            email: "",
            password: "",
        },
      })
       
      async function onSubmit(values: z.infer<typeof loginUserSchema>) {
          //create obj
        const app = document.getElementById('submit');
        const text = 'processing';
        if(app !== null){
          app.innerHTML = text;
        }
          const data = await loginUser(values)
          const first = data[0]
          const second = data[1]
          const third = data[2]
          const forth = data[3]
          const name = data[6]
          const email = data[4]
          const username = data[5]
          const id = data[7]
          const userType = data[8]

        // decrypt password n compare
        const dec = handleDecryption(second, third)
        dec.then((res) => {
            if(res === undefined){
                if(app !== null){
                    app.innerHTML = "Login";
                }
                form.setError("root", {
                    "message": "Invalid login credentails"
                })
            }
            else if(res.toString() === values.password && forth === 'admin' || forth === 'staff'){
                if(app !== null){
                    app.innerHTML = "Successful";
                }
                form.setError("root", {
                "message": "Loggin you in..."
                })
                localStorage.setItem("token", first)
                localStorage.setItem("name", name)
                localStorage.setItem("username", username)
                localStorage.setItem("email", email)
                localStorage.setItem("id", id)
                localStorage.setItem("userType", userType)
                redirect("admin/dashboard/home")
            } 
            else if(res.toString() !== values.password){
                form.setError("root", {
                "message": "invalid login credentials"
                })
            }else if(forth !== 'admin' && forth !== "staff"){
                form.setError("root", {
                "message": "unauthorised user login"
                })
            }else{
                form.setError("root", {
                "message": "contact administration"
                })
            }
            
        })
        }
    return(
            <div className="sm:p-16 p-2 bg-muted flex flex-col items-center">
            <div className="p-4 sm:rounded-l-3xl sr:rounded-t-2xl flex flex-col justify-center items-center text-muted sm:columns-1"> 
               <Image src={Logo} width={150} height={150} alt="logo"/>                  
            </div>
                <div className=" pb-4 w-[350px] bg-background dark:bg-muted">
                  <div className="text-2xl p-4 tracking-tight font-bold sm:mb-8 grid justify-center items-center">Login</div>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center px-8">
                        <div>
                            <div className="">
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
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" id="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <div className="flex justify-between cursor-pointer">
                                <div className="text-sm mt-2" id="see" onClick={() => togglePasswordVisibility()}><EyeOff/> see password</div>
                                </div>
                            </div>
                        </div>
                        <Button className=" text-white w-full mt-4" id="submit" type="submit">Login</Button>
                        </div>

                    <div className="text-sm text-muted py-4 px-8">Forgot password?</div>
                    {form.formState.errors.root && (
                        <div className="border border-primary text-sm mx-4 text-primary p-2 text-center rounded-md">{form.formState.errors.root.message}</div>
                    )}
                    </form>
                    </Form>
                </div>
                <div className="text-xs py-4">This portal is a copyright of Pakwach FM Radio Station. Only authorised personnel can have access to it.</div>
            </div>
    )
}
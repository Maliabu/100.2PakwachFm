/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import React, { JSX } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { checkEmail, loginUser, sendHtmlEmail } from "@/server/fetch.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { redirect } from "next/navigation"
import { handleDecryption, handleEncryption } from "@/services/services"
import { Eye, EyeOff, Mail, Moon, PhoneCall, Sun} from "lucide-react"
import { loginUserSchema, resetPasswordSchema } from "@/schema/schema"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sendPasswordResetLInk } from "@/nodemailer"
import Image from "next/image"
import Logo from '../images/logo (1).png'



export default function StepWise() {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false);
    const { setTheme } = useTheme() 
    const [showPassword, setShowPassword] = useState(false);
    const [buttonText, setButtonText] = useState("Request Password Link");

    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev);
    };

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
          defaultValues: {
            email: "",
            password: "",
        },
      })

      const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
          defaultValues: {
            email: "",
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
        const picture = data[9]

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
              "message": "Signing you in shortly..."
              })
              setTimeout(() => {
                form.setError("root", {
                    "message": "Please wait..."
                    })
              }, 1500)
              localStorage.setItem("token", first)
              localStorage.setItem("name", name)
              localStorage.setItem("username", username)
              localStorage.setItem("email", email)
              localStorage.setItem("id", id)
              localStorage.setItem("userType", userType)
              localStorage.setItem('picture', picture)
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
        async function emailCheck(){
            const email = resetForm.getValues("email")
            const check = await checkEmail(email)
            if(check.error == false){
                resetForm.setError("root", {
                    "message": "Account doesnot exist"
                })
                setTimeout(() => {
                    resetForm.clearErrors()
                    }, 5000)
                return check.name
            } else {
                resetForm.setError("root", {
                    "message": "Account found"
                })
                setTimeout(() => {
                    resetForm.clearErrors()
                    }, 5000)
                return check.name
            }
        }


        async function onSubmit1(values: z.infer<typeof resetPasswordSchema>) {
            setButtonText('processing')
            const account = await emailCheck()
            //create obj
            if(account !== ''){
                const encr = await handleEncryption(values.email)
                const link = 'https://newfeelventures.com/reset?email='+encodeURIComponent(encr.encryptedData)+'&init='+encodeURIComponent(encr.initVector)
                const sendEmail = await sendHtmlEmail(values.email, 'Password Reset', account, link)
                if(sendEmail == true){
                    setButtonText('Email Successful')
                    resetForm.setError("root", {
                        "message": "Check your email for a password reset link"
                    })
                    setTimeout(() => {
                        resetForm.clearErrors()
                        }, 5000)
                } else{
                    setButtonText('Email Failed')
                    resetForm.setError("root", {
                        "message": "Something went wrong"
                    })
                    setTimeout(() => {
                        resetForm.clearErrors()
                        }, 5000)
                }
            }else{
                setButtonText('Email Failed')
                resetForm.setError("root", {
                    "message": "Account doesnot exist"
                })
                setTimeout(() => {
                resetForm.clearErrors()
                }, 5000)
            }
        }

    const _next = () => {
      let currStep = currentStep
      currStep = currentStep + 1 
      setCurrentStep(currStep)
    }
    const _prev = () => {
        let currStep = currentStep
        currStep = currentStep - 1
        setCurrentStep(currStep)
    }
    function nextButton() {
        const currStep = currentStep;
        if (currStep == 1) {
            return ( 
                <div
                onClick = { _next } >
                Forgot Password? 
                </div>        
            )
        }
        else {
            return ( 
                <div
                onClick = { _prev } >
                Back to Login 
                </div>        
            )
        }
    }
    return (
        <div className="sm:p-16 p-2 flex flex-col items-center bg-secondary">
            <div className="p-4 sm:rounded-l-3xl sr:rounded-t-2xl flex flex-col justify-center items-center text-muted sm:columns-1"> 
               <Image src={Logo} width={150} height={150} alt="logo"/>                  
            </div>
            <div className="sm:p-8 p-4 sm:px-20 sm:pb-16 bg-background/20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="bg-transparent shadow-none border-0">
                    <Button variant="outline">
                    <Sun className="h-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-50" />
                    <Moon className=" h-[1.2rem] rotate-90 scale-50 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                <Step1 
                currentStep={currentStep}
                button = { nextButton() }
                form={form}
                onSubmit={onSubmit}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                />
                <Step2
                currentStep={currentStep}
                onSubmit={onSubmit1}
                prev = { nextButton() }
                form={resetForm}
                buttonText={buttonText}
                />
                </div>
                <div className="text-xs py-4">This portal is a copyright of Pakwach FM Radio Station. Only authorised personnel can have access to it.</div>
    </div>
        )
}

function Step1(props:
    {
        currentStep: number, form: any, onSubmit: (values: z.infer<typeof loginUserSchema>) => Promise<void>,button:JSX.Element | null, togglePasswordVisibility: () => void, showPassword: boolean}) {
    if (props.currentStep !== 1) {
        return null
    }
    return (
        <div className=" p-6 w-[350px] bg-background dark:bg-muted rounded">
          <div className="text-3xl tracking-tight font-bold sm:mb-8 grid justify-center items-center">Sign in</div>
            <Form {...props.form}>
            <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
            <div className="grid w-full items-center">
                <div>
                    <div className="">
                    <FormField
                        control={props.form.control}
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
                        control={props.form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="flex items-center">
                                <FormControl>
                                <Input
                                    type={props.showPassword ? "text" : "password"}
                                    {...field}
                                    placeholder="Password"
                                    className="dark:border dark:border-muted-foreground shadow-none"
                                />
                                </FormControl>
                                <button
                                type="button"
                                onClick={props.togglePasswordVisibility}
                                className="ml-2 p-2 border rounded-md"
                                >
                                {props.showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                            {/* <FormControl>
                            <div className="flex justify-between cursor-pointer">
                            <Input type={props.showPassword ? 'text' : 'password'} id="password" placeholder="Password" {...field} className="dark:border dark:border-muted-foreground shadow-none"/>
                            <p className="text-sm border ml-1 rounded-md p-2" id="see" onClick={() => props.togglePasswordVisibility()}>{props.showPassword ? <Eye size={16}/> : <EyeOff size={16}/>}</p>
                            </div>                            
                            </FormControl> */}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>
                <Button className=" text-white w-full mt-4" id="submit" type="submit">Sign in</Button>
                </div>

            <div className="text-xs grid justify-center cursor-pointer text-primary pt-4">{props.button}</div>
            {props.form.formState.errors.root && (
                <div className=" font-bold border light:bg-red-100 text-sm mx-4 border-primary text-primary p-2 text-center rounded-md">{props.form.formState.errors.root.message}</div>
            )}
            </form>
            </Form>
        </div>
    );
}

function Step2(props:{
    currentStep: number, form: any, buttonText: string, onSubmit: (values: z.infer<typeof loginUserSchema>) => Promise<void>,
    prev: JSX.Element,
    }) {
    if (props.currentStep !== 2) {
        return null
    }
    return (<div className="p-8 w-[350px] bg-background shadow-lg dark:bg-muted rounded">
              <div className="text-3xl tracking-tight font-bold grid justify-center items-center">Reset Password</div>
              <div className="text-xs grid justify-center items-center my-4">Enter your email to receive a password reset link so you can change your password.</div>
              <Form {...props.form}>
                <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
                <div className="grid items-center">
                    <div>
                        <div className="">
                        <FormField
                            control={props.form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field}  className="dark:border dark:border-muted-foreground shadow-none"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                    </div>
                </div>
                <Button className="my-4 text-sm text-white w-full" id="submit1" type="submit">{props.buttonText}</Button>
                {props.form.formState.errors.root && (
                    <div className=" bg-green-200 text-primary p-2 text-center rounded-md">{props.form.formState.errors.root.message}</div>
                )}
                <div className="text-primary text-xs cursor-pointer flex justify-center mt-2">{props.prev}</div>
                </form>
                </Form>
    </div>);
    }
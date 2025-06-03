/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { db } from "@/db/db";
import { EventsTable, activityTable, articlesTable, commentsTable, courseTable, currencyTable, editorImagesTable, enrollmentsTable, messagesTable, nextCourseTable, notificationsTable, programmingTable, replyTable, subscriptionsTable, usersTable, votesTable } from "@/db/schema";
import "use-server"
import { z } from "zod";
import { addArticleSchema, addCourseSchema, addEnrollmentSchema, addEventSchema, addNextCourseSchema, addNotificationSchema, addProgrammingSchema, addSubscriptionSchema, addUserSchema, commentsSchema, deleteArticleSchema, deleteEventSchema, deleteProgrammingSchema, deleteSchema, deleteUserSchema, loginUserSchema, messagesSchema, replySchema, updateCourseSchema, uploadProfilePicture, voteSchema } from '@/schema/schema'
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { File } from "node:buffer";
import { promises as fs } from "node:fs";
import { sendPasswordResetLInk } from "@/nodemailer";
// import { sendEmail } from "@/nodemailer";

const today = new Date()

function env(){
    if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test"){
        return 'http://localhost:3000'
    } else if(process.env.NODE_ENV == 'production'){
        return 'https://pakwachfm.com'
    } else {
        return 'http://localhost:3000'
    }
}

const cpanelUrl = 'https://uploads.pakwachfm.com/editor'

export async function addUsers(unsafeData: z.infer<typeof addUserSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addUserSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }

//    uploadFile(formData)

   const dataAdd = await db.insert(usersTable).values({...data})
   if(dataAdd){
   //log what we did
   await logActivity("Added new user: "+data.email, data.userId)}
   else{
    return {error: true}
   }

   return {error: false}
//    redirect("/admin/dashboard")
}

export async function logActivity(activity: string, userId: string): Promise<{error: boolean, message: string}>{
    //create our data object
    const data = {
        user: parseInt(userId),
        activity: activity
    }
    if(!activity && !userId){
        return {error: true, message: "missing information"}
    } else{
        // with all the information on what we are doing
        //lets log who did what
        await db.insert(activityTable).values({...data})
        return {error: false, message: "ok"}
    }
}

export async function uploadFile(formData: FormData) {
    const file = formData.get("file") as unknown as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    try {
        await fs.writeFile(`./public/profilePictures/${file.name}`, buffer);
    }
    catch{
        await fs.mkdir('./public/profilePictures')
        await fs.writeFile(`./public/profilePictures/${file.name}`, buffer);
    }
    revalidatePath("/");
}

export async function uploadCloudinaryFile(formData: FormData) {
    try {
        const response = await fetch(`${env()}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const contentType = response.headers.get('Content-Type');
  
        const result = await response.json();
  
        if (response.ok) {
          return result.fileUrl// Set the image URL from the response
        } else {
          return null
        }
      } catch (error) {
        return error
      }
}

export async function uploadServerFile(formData: FormData) {
    try {
        const response = await fetch(`${env()}/api/server`, {
          method: 'POST',
          body: formData,
        });
        const contentType = response.headers.get('Content-Type');
  
        const result = await response.json();
  
        if (response.ok) {
          return result.fileUrl// Set the image URL from the response
        } else {
          return null
        }
      } catch (error) {
        return error
      }
}

export async function uploadEventFile(formData: FormData) {
    const file = formData.get("file") as unknown as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    try {
        await fs.writeFile(`./public/events/${file.name}`, buffer);
    }
    catch{
        await fs.mkdir('./public/events')
        await fs.writeFile(`./public/events/${file.name}`, buffer);
    }
    revalidatePath("/");
}

// export async function sendHtmlEmail(email: string, title:string, name:string){
//     sendEmail(email, title, name)
//     return true
// }

export async function uploadCourseFile(formData: FormData) {
    const file = formData.get("file") as unknown as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    try {
        await fs.writeFile(`./public/courses/${file.name}`, buffer);
    }
    catch{
        await fs.mkdir('./public/courses')
        await fs.writeFile(`./public/courses/${file.name}`, buffer);
    }
    revalidatePath("/");
}

export async function uploadArticleFile(formData: FormData) {
    const file = formData.get("file") as unknown as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    try {
        // await fs.writeFile(`./public/articles/${file.name}`, buffer);
        await fs.writeFile(`./public/articles/${file.name}`, buffer);
    }
    catch{
        await fs.mkdir('./public/articles')
        await fs.writeFile(`./public/articles/${file.name}`, buffer);
    }
    revalidatePath("/");
}

export async function  uploadEditorFile(formData: FormData) {
    const file = formData.get("file") as unknown as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const data = {
        "image": file.name
    }        

    try {
        await fs.writeFile(`./public/editor/${file.name}`, buffer);
        await db.insert(editorImagesTable).values(data)
        return {"image": data.image}
    }
    catch{
        await fs.mkdir('./public/editor')
        await fs.writeFile(`./public/editor/${file.name}`, buffer);
    }
}

export async function  uploadAds(formData: FormData) {
    const file = formData.get("file") as unknown as File;
    const folder = formData.get('folder')
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const data = {
        "image": encodeURI(file.name)
    }        

    try {
        const res = await fetch('https://uploads.pakwachfm.com/uploads.php', {
            method: 'POST',
            body: formData,
          });
      
          if (res.ok) {
            const data = await res.json();
            console.log('File uploaded to:', data.url);
            return {"image": data.image, "url": data.url}

          } else {
            console.error('Upload failed');
            return {"image": data.image, "url": ''}

          }
    }
    catch(error){
        console.log('NOT UPLOADED', error)
        return {"image": data.image, "url": ''}
    }
}

export async function readEditorFiles(){
    try{
        const res = await db.query.editorImagesTable.findMany()
        const images = res.map((image) => image.image)
        const ids = res.map((ids) => ids.id)
        console.log(images)
        return images
    } catch{
        return []
    }
}

export async function sendHtmlEmail(email: string, title:string, name:string, link: string){
    sendPasswordResetLInk(email, title, name, link)
    return true
}

export async function checkEmail(email: string){
    const check = await db.query.usersTable.findFirst({where:eq(usersTable.email, email)})
    if(check !== undefined){
        return {error: true, name: check.name, email: check.email}
    } else {
        return {error: false, name: "", email: email}
    }
}

export async function loginUser(unsafeData: z.infer<typeof loginUserSchema>){
    const {success, data} = loginUserSchema.safeParse(unsafeData)
 
    if (!success){
     return ["error"]
    }
 
    //goal is to get token
    let token = ''
    let encrPass = ''
    let initVector = ''
    let usertype = ''
    let email = ''
    let username = ''
    let name = ''
    let id = 0
    let userType = ''
    let picture = ''
 
    const checkEmail = await db.query.usersTable.findFirst({
     where: eq(usersTable.email, data.email)
    })
    if(checkEmail && checkEmail.isActive === true){
     encrPass = checkEmail.password
     initVector = checkEmail.decInit
     token = checkEmail.token
     usertype = checkEmail.userType
     email = checkEmail.email
     username = checkEmail.username
     name = checkEmail.name
     id = checkEmail.id
     userType = checkEmail.userType
     picture = checkEmail.profilePicture || ''
 
     // before login, update isloggedin and lastlogin
     await db.update(usersTable).set({
         isLoggedIn: true,
         lastLogin: today
     }).where(
         eq(usersTable.email, data.email)
     )
    }
    await logActivity(name+" Logged in", id.toString())
    
    return [token, encrPass, initVector, usertype, email, username, name, id.toString(), userType, picture]
 }

export async function addEvents(unsafeData: z.infer<typeof addEventSchema>, formData: FormData) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addEventSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }

//    uploadEventFile(formData)
const profile = await uploadAds(formData)

if(profile !== null){
    data.image = profile.url
    await db.insert(EventsTable).values({...data})
    await logActivity('Added article: '+data.title, data.userId)
    return {error: false}
} else {
    return {error: true}       
}
}

export async function addNewNotification(unsafeData: z.infer<typeof addNotificationSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addNotificationSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }

   await db.insert(notificationsTable).values({...data})

   await logActivity("Added new Notification: "+data.notification, data.sender.toString())

   return {error: false}
//    redirect("/admin/dashboard")
}

export async function addComment(unsafeData: z.infer<typeof commentsSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = commentsSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }
        
   await db.insert(commentsTable).values({...data})

   return {error: false}
}

export async function reply(unsafeData: z.infer<typeof replySchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = replySchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }
        
   await db.insert(replyTable).values({...data})

   return {error: false}
}

export async function addCourse(unsafeData: z.infer<typeof addCourseSchema>, formData: FormData) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addCourseSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }

//    uploadCourseFile(formData)
   //mostly spell check n no of arguments in payload
   // add currencies
   const profile = await uploadServerFile(formData)
   if(profile !== null){
        const profileUrl = profile.toString()
        data.image = profileUrl
          
        const currencyId = await db.query.currencyTable.findMany({
            where: eq(currencyTable.currency, data.currency1)
        })
        const mentorId = await db.query.usersTable.findMany({
            where: eq(usersTable.name, data.mentor1)
        })
        const currencyid = currencyId.map(currency=>currency.id)
        const mentorid = mentorId.map(mentor=>mentor.id)
        data.currency = currencyid[0]
        data.mentor = mentorid[0]

        await db.insert(courseTable).values({...data})
       return {error: false}
   } else {
       return {error: true}       
   }
}

export async function updateCourse(unsafeData: z.infer<typeof updateCourseSchema>, formData: FormData, id:number) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = updateCourseSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }

//    uploadCourseFile(formData)
   //mostly spell check n no of arguments in payload
   // add currencies
   const profile = await uploadServerFile(formData)
   if(profile !== null){
        const profileUrl = profile.toString()
        data.image = profileUrl

        const currencyId = await db.query.currencyTable.findMany({
            where: eq(currencyTable.currency, data.currency1)
        })
        const mentorId = await db.query.usersTable.findMany({
            where: eq(usersTable.name, data.mentor1)
        })
        const currencyid = currencyId.map(currency=>currency.id)
        const mentorid = mentorId.map(mentor=>mentor.id)
        data.currency = currencyid[0]
        data.mentor = mentorid[0]

        await db.update(courseTable).set({...data}).where(eq(courseTable.id, id))
       return {error: false}
   } else {
       return {error: true}       
   }
}

export async function deleteCourse(unsafeData: z.infer<typeof deleteSchema>): 
Promise<{error: boolean | undefined}>{
    const {success, data} = deleteSchema.safeParse(unsafeData)

    if (!success){
        return {error: true}
    }

    await db.delete(courseTable).where(eq(courseTable.id, data.courseId))

    return {error: false}
}

export async function deleteEvent(unsafeData: z.infer<typeof deleteEventSchema>): 
Promise<{error: boolean | undefined}>{
    const {success, data} = deleteEventSchema.safeParse(unsafeData)

    if (!success){
        return {error: true}
    }

    await db.delete(EventsTable).where(eq(EventsTable.id, data.eventId))

    return {error: false}
}
export async function deleteUser(unsafeData: z.infer<typeof deleteUserSchema>): 
Promise<{error: boolean | undefined}>{
    const {success, data} = deleteUserSchema.safeParse(unsafeData)

    if (!success){
        return {error: true}
    }

    await db.delete(usersTable).where(eq(usersTable.id, data.userId))

    return {error: false}
}
export async function deleteArticle(unsafeData: z.infer<typeof deleteArticleSchema>): 
Promise<{error: boolean | undefined}>{
    const {success, data} = deleteArticleSchema.safeParse(unsafeData)

    if (!success){
        return {error: true}
    }

    await db.delete(articlesTable).where(eq(articlesTable.id, data.articleId))

    return {error: false}
}
export async function deleteProgramming(unsafeData: z.infer<typeof deleteProgrammingSchema>): 
Promise<{error: boolean | undefined}>{
    const {success, data} = deleteProgrammingSchema.safeParse(unsafeData)

    if (!success){
        return {error: true}
    }

    await db.delete(programmingTable).where(eq(programmingTable.id, data.programId))

    return {error: false}
}

export async function deleteEditorFile(image: string): 
Promise<{error: boolean | undefined}>{
    const imageToDelete = await db.query.editorImagesTable.findFirst({
        where: eq(editorImagesTable.image, image)
    })
    if(imageToDelete !== undefined){
        const imageId = imageToDelete?.id
        await db.delete(editorImagesTable).where(eq(editorImagesTable.id, imageId))
        return {error: false}
    }

    return {error: true}
}

export async function addArticles(unsafeData: z.infer<typeof addArticleSchema>, formData: FormData) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addArticleSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }

//    uploadArticleFile(formData)
    const profile = await uploadAds(formData)

    if(profile !== null){
        data.image = profile.url
        await db.insert(articlesTable).values({...data})
        await logActivity('Added article: '+data.title+'on '+data.date, data.userId)
        return {error: false}
    } else {
        return {error: true}       
    }

}

export async function uploadProfileImage(unsafeData: z.infer<typeof uploadProfilePicture>, formData: FormData) : 
Promise<{error: boolean | undefined, url: string}> {
   const {success, data} = uploadProfilePicture.safeParse(unsafeData)

   if (!success){
    return {error: true, url: ''}
   }
   try{

//    uploadArticleFile(formData)
    const profile = await uploadAds(formData)

    if(profile !== null){
        data.image = profile.url
        const id = parseInt(data.userId)
        await db.update(usersTable).set({profilePicture: data.image}).where(eq(usersTable.id, id))
        await logActivity('Updated their profile picture to: '+data.image, data.userId)
        return {error: false, url: data.image}
    } else {
        return {error: true, url: ''}       
    }
}catch(error){
    return {error: true, url: ''}
}

}

export async function addprogrammings(unsafeData: z.infer<typeof addProgrammingSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addProgrammingSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }
    
   try{
    console.log(data)
        const programmes = await db.insert(programmingTable).values({...data})
        return {error: false}
    } catch(error){
        console.log(error)
        return {error: true}
    }

}

export async function addEnrollment(unsafeData: z.infer<typeof addEnrollmentSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addEnrollmentSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }
   const courseId = await db.query.courseTable.findMany({
    where: eq(courseTable.title, data.course1)
   })
   const courseid = courseId.map(course=>course.id)
   data.courseId = courseid[0]
   console.log({...data})

   await db.insert(enrollmentsTable).values({...data})

   return {error: false}
}

export async function addEnrollmentRequest(courseId: number, email: string) : 
Promise<{error: boolean}> {

   if (courseId === 0 && email === ""){
    return {error: true}
   }
   const data = {
    courseId: courseId,
    email: email
   }
   // user cannot enroll more than once for each course
   const checkEnrollment = await db.query.enrollmentsTable.findMany({
    where: eq(enrollmentsTable.email, data.email) && eq(enrollmentsTable.courseId, data.courseId)
   })
   if(checkEnrollment.length === 0){
        await db.insert(enrollmentsTable).values({...data})
        return {error: false}
    } else{
        return {error: true}
    }
}

export async function addSubscription(unsafeData: z.infer<typeof addSubscriptionSchema>) : 
Promise<{error: boolean | undefined, message: string}> {
   const {success, data} = addSubscriptionSchema.safeParse(unsafeData)

   if (!success){
    return {error: true, message: "successful"}
   }
   // check email isnt repeated
   const checkEmail = await db.query.subscriptionsTable.findMany(
    {
        where: eq(subscriptionsTable.email, data.email)
    }
   )
   if(checkEmail.length === 0){
    await db.insert(subscriptionsTable).values({...data})
    return {error: false, message: "Subscription successful"}
   } else {
    return {error: true, message: "User already subscribed"}
   }
}

export async function addMessages(unsafeData: z.infer<typeof messagesSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = messagesSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }

   await db.insert(messagesTable).values({...data})

   return {error: false}
}

export async function upvote(unsafeData: z.infer<typeof voteSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = voteSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }
   // no 2 same upvotes for same article and email
   const checkEmail = await db.query.votesTable.findMany({
    where: eq(votesTable.article, data.article) && eq(votesTable.email, data.email)
   })
   if(checkEmail.length === 0)
    {
    await db.insert(votesTable).values({...data})
    return {error: false}
    } else{
        return {error: true}
    }
}

export async function logout(formData: FormData): Promise<{error: boolean}>{
    const data = formData.get("email") as string || ""
     // before logout, update isloggedin to false
     const logout = await db.update(usersTable).set({
         isLoggedIn: false,
     }).where(
         eq(usersTable.email, data)
     )
     if(logout){
     return {error: false}
    } else {
        return {error: true}
    }
 }

 export async function checkEmailPhone(email: string, phone: string) : 
 Promise<{message: string}> {
 //    uploadFile(formData)
 
    const check = await db.query.usersTable.findMany({
     where: eq(usersTable.email, email)
    })
    if(check.length == 0){
         //we got no match
         const phoneCheck = await db.query.usersTable.findMany({
             where: eq(usersTable.phone, phone)
         })
         if(phoneCheck.length == 0){
             return {message: "good"}
         } else{
             return {message: "phone exists"}
         }
     }
    else{
     return {message: "email exists"}
    }
 }

export async function nextCourse(unsafeData: z.infer<typeof addNextCourseSchema>) : 
Promise<{error: boolean | undefined}> {
   const {success, data} = addNextCourseSchema.safeParse(unsafeData)

   if (!success){
    return {error: true}
   }
   const courseId = await db.query.courseTable.findMany({
    where: eq(courseTable.title, data.course1)
   })
   const courseid = courseId.map(course=>course.id)
   data.courseId = courseid[0]

   await db.insert(nextCourseTable).values({...data})

   return {error: false}
}

import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";

export async function getUser(id: number){
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    })
    return user?.name
}
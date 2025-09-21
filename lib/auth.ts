import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "./db"

export interface User {
  id: string
  email: string
  name?: string
}

export interface Tenant {
  id: string
  name: string
  owner_user_id: string
  plan_id: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateJWT(payload: any, expiresIn = "24h"): string {
  if (!process.env.JWT_SIGNING_SECRET) {
    throw new Error("JWT_SIGNING_SECRET is not set")
  }
  return jwt.sign(payload, process.env.JWT_SIGNING_SECRET, { expiresIn })
}

export function verifyJWT(token: string): any {
  if (!process.env.JWT_SIGNING_SECRET) {
    throw new Error("JWT_SIGNING_SECRET is not set")
  }
  return jwt.verify(token, process.env.JWT_SIGNING_SECRET)
}

export async function createUser(email: string, password: string, name?: string) {
  const passwordHash = await hashPassword(password)
  const result = await db.query(
    "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name",
    [email, passwordHash, name],
  )
  return result.rows[0] as User
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db.query("SELECT id, email, name FROM users WHERE email = $1", [email])
  return result.rows[0] || null
}

export async function getUserWithPassword(email: string) {
  const result = await db.query("SELECT id, email, name, password_hash FROM users WHERE email = $1", [email])
  return result.rows[0] || null
}

export async function createTenant(ownerId: string, name: string): Promise<Tenant> {
  // Get the free plan ID
  const planResult = await db.query("SELECT id FROM plans WHERE name = $1", ["Free"])
  const planId = planResult.rows[0]?.id

  const result = await db.query("INSERT INTO tenants (owner_user_id, name, plan_id) VALUES ($1, $2, $3) RETURNING *", [
    ownerId,
    name,
    planId,
  ])
  return result.rows[0] as Tenant
}

export async function getTenantByUserId(userId: string): Promise<Tenant | null> {
  const result = await db.query("SELECT * FROM tenants WHERE owner_user_id = $1", [userId])
  return result.rows[0] || null
}

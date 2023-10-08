#!/usr/bin/env node
import process from 'node:process'
import { create } from '@mcous/create'

try {
  const { manifest } = await create(process.argv.slice(2))
  console.log(`Successfully wrote ${manifest}`)
} catch (error) {
  console.error(error)
  process.exitCode = 1
}

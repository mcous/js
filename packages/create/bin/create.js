#!/usr/bin/env node
import process from 'node:process'
import { create } from '@mcous/create'

try {
  const files = await create(process.argv.slice(2), process.cwd())

  for (const { result, filename } of files) {
    console.log(`${result}: ${filename}`)
  }
} catch (error) {
  console.error(error)
  process.exitCode = 1
}

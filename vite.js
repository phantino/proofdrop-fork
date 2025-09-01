#!/usr/bin/env node
import { spawn } from 'child_process'

// Start vite with the correct port configuration
const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '5000' }
})

vite.on('close', (code) => {
  process.exit(code)
})
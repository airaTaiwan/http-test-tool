import os from 'node:os'
import { exec } from 'node:child_process'
import prompts from 'prompts'
import open from 'open'
import { consola } from 'consola'
import {
  blue,
  cyan,
  green,
  lightBlue,
  lightGreen,
  lightRed,
  magenta,
  red,
  reset,
  yellow,
} from 'kolorist'

// write a function to random return kolorist color
function randomKoloristColor() {
  const koloristColor = [
    blue,
    cyan,
    green,
    lightBlue,
    lightGreen,
    lightRed,
    magenta,
    yellow,
  ]
  return koloristColor[Math.floor(Math.random() * koloristColor.length)]
}

function getIPv4Addresses() {
  const interfaces = os.networkInterfaces()
  const ipv4Addresses = []

  for (const key in interfaces) {
    const iface = interfaces[key]
    if (iface) { // 檢查 iface 是否存在
      for (const config of iface) {
        if (config.family === 'IPv4' && !config.internal)
          ipv4Addresses.push(config.address)
      }
    }
  }

  return ipv4Addresses
}

const command = 'node .output/server/index.mjs'

async function init() {
  let result: prompts.Answers<'ipv4'>

  try {
    result = await prompts(
      {
        type: 'select',
        name: 'ipv4',
        message: reset('Select an ip to start server:'),
        initial: 0,
        choices: getIPv4Addresses().map((ip) => {
          const Color = randomKoloristColor()
          return {
            title: Color(ip),
            value: ip,
          }
        }),
      },
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        },
      },
    )
  }
  catch (cancelled) {
    consola.warn(cancelled.message)
    return
  }

  const { ipv4 } = result

  consola.info(`\Startting server on ${ipv4}...`)

  exec(`HOST=${ipv4} ${command}`)

  consola.success(`\nDone. Now running on http://${ipv4}:3000`)
  open(`http://${ipv4}:3000`)
}

init().catch((e) => {
  consola.warn(e)
})

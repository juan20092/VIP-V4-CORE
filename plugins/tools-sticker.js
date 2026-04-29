import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
let stiker = false
let userId = m.sender
let packstickers = global.db.data.users[userId] || {}
let texto1 = packstickers.text1 || global.packsticker
let texto2 = packstickers.text2 || global.packsticker2
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
let txt = args.join(' ')
if (/webp|image|video/g.test(mime) && q.download) {
if (/video/.test(mime) && (q.msg || q).seconds > 16)
return conn.reply(m.chat, `┏━❖ 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐋𝐈𝐌𝐈𝐓𝐄 ❖━┓\n┃\n┃ ⚠️ 𝐕𝐢𝐝𝐞𝐨 𝐦𝐮𝐲 𝐥𝐚𝐫𝐠𝐨\n┃ 𝐒𝐨𝐥𝐨 𝐬𝐞 𝐚𝐜𝐞𝐩𝐭𝐚𝐧\n┃ 𝐡𝐚𝐬𝐭𝐚 𝟏𝟓 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬\n┃\n┗━━━━━━━━━━━━━━━━┛`, m, rcanal)
let buffer = await q.download()
await m.react('🕓')
let marca = txt ? txt.split(/[\u2022|]/).map(part => part.trim()) : [texto1, texto2]
stiker = await sticker(buffer, false, marca[0], marca[1])
} else if (args[0] && isUrl(args[0])) {
let buffer = await sticker(false, args[0], texto1, texto2)
stiker = buffer
} else {
return conn.reply(m.chat, `╔━✦ 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 🚩✦━═╗\n\n ◈ 𝐄𝐧𝐯𝐢𝐚 𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞\n ◈ 𝐈𝐦𝐚𝐠𝐞𝐧, 𝐯𝐢𝐝𝐞𝐨 𝐨 𝐰𝐞𝐛𝐩\n\n ◈ 𝐋𝐢𝐦𝐢𝐭𝐞 𝐝𝐞 𝐯𝐢𝐝𝐞𝐨\n ◈ 𝐌𝐚𝐱𝐢𝐦𝐨 𝟏𝟓 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬\n\n╚═━━━✦♑︎✦━━━═╝`, m, rcanal)
}
} catch (e) {
await conn.reply(m.chat, `╭━━❮ 𝐄𝐑𝐑𝐎𝐑 𝐃𝐄 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 ❯━━╮\n│\n│ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐠𝐞𝐧𝐞𝐫𝐚𝐫\n│ 𝐞𝐥 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐚𝐡𝐨𝐫𝐚\n│\n│ 𝐌𝐨𝐭𝐢𝐯𝐨: ${e.message}\n│\n╰━━━━━━━━━━━━━━━━━━━━╯`, m, rcanal)
await m.react('✖️')
} finally {
if (stiker) {
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
await m.react('✅')
}}
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker']

export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(jpe?g|gif|png)/, 'gi'))
}

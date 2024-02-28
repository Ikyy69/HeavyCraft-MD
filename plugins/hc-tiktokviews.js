import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `Masukkan Url!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@przxmamiellio/video/7331202523023346949`, m);
    conn.reply(m.chat, 'Sedang diproses, mohon tunggu...', m);
    m.react('⌛');
    
    const apiEndpoint = `https://rzky.my.id/api/tools/tiktokviews?apikey=${rzky}&url=${args[0]}`;
    const get = await fetch(apiEndpoint);
    const js = await get.json();

    if (js.result) {
      const {
        service,
        status,
        quantity,
        data
      } = js.result;

      if (js.result.msg === "Masih terdapat pesanan pending dengan target yang sama.") {
        m.react('❌');
        conn.reply(m.chat, `_*${js.result.msg}*_`, m);
      } else {
        let message = `❏ Service : ${service}\n❏ Status : ${status}\n❏ Jumlah : ${quantity}\n❏ Data : ${data}\n`;
        await conn.reply(m.chat, message, m);
        m.react('✅');
      }
    } else {
      m.react('❌');
      conn.reply(m.chat, `_*Tidak ada hasil atau terjadi kesalahan!*_`, m);
    }
  } catch (e) {
    console.error(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
      m.react('❌');
    }
  }
};

handler.help = ['tiktokviews'];
handler.tags = ['main'];
handler.command = ['tiktokviews'];
handler.register = true;

export default handler;
export default async function handler(req, res) {
  try {
    const username = req.query.username;

    if (!username) {
      return res.status(400).json({ error: "username kosong" });
    }

    const response = await fetch(
      `https://api-tiktok-pihak-ketiga.com/user/info?username=${username}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.TIKTOK_API_KEY}`
        }
      }
    );

    const data = await response.json();

    // ambil data penting aja
    const result = {
      nickname: data.user.nickname,
      avatar: data.user.avatar_thumb
    };

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ error: "gagal ambil data" });
  }
}

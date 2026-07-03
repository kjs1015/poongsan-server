const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/meal', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "날짜가 필요합니다." });

    // ⚠️ 여기에 네 진짜 인증키를 꼭 넣어줘!
    const KEY = "
c16796f70d5548eda72297864e079f4e
"; 
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750475&MLSV_YMD=${date}&KEY=${KEY}`;

    try {
        const response = await axios.get(url);
        // ⭐ 중요: 서버가 필터링하지 않고 나이스 응답을 통째로 화면에 던지게 함!
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ error: "나이스 서버 연결 실패", details: error.message });
    }
});

app.listen(PORT);

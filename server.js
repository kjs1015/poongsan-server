const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/meal', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "날짜(date)가 필요합니다." });

    // ⭐ 안동 풍산고 정보와 네 인증키 결합
    const KEY = "c16796f70d5548eda72297864e079f4e"; 
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750475&MLSV_YMD=${date}&KEY=${KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ error: "나이스 서버 연결 실패" });
    }
});

app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 작동 중!`));

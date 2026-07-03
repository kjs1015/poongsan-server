const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/meal', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "날짜가 필요합니다." });

    const KEY = process.env.NEIS_KEY; 
    if (!KEY) return res.status(500).json({ error: "서버 환경변수(NEIS_KEY)가 설정되지 않았습니다." });

    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750475&MLSV_YMD=${date}&KEY=${KEY}`;

    try {
        const response = await axios.get(url);
        // ⭐ 프론트엔드가 바로 읽을 수 있게 가공 없이 순수 데이터만 쏴줍니다!
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ error: "나이스 서버 연결 실패" });
    }
});

app.listen(PORT);

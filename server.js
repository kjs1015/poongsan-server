const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/meal', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "날짜(date) 파라미터가 필요합니다." });

    // 🦅 경북교육청(R10)과 안동 풍산고의 진짜 코드(8750475) 매칭 완료!
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750475&MLSV_YMD=${date}`;

    try {
        const response = await axios.get(url);
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ error: "나이스 서버로부터 데이터를 가져오지 못했습니다." });
    }
});

app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 작동 중입니다.`));

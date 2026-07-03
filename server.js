const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// 모든 주소에서의 접근을 허용 (CORS 에러 해제)
app.use(cors());

app.get('/api/meal', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "날짜(date) 파라미터가 필요합니다." });

    // 나이스 오픈 API 공식 주소 (풍산고 코드 적용)
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8323114&MLSV_YMD=${date}`;

    try {
        const response = await axios.get(url);
        res.json(response.data); // 나이스 데이터를 에러 없이 앱으로 전달
    } catch (error) {
        res.status(500).json({ error: "나이스 서버로부터 데이터를 가져오지 못했습니다." });
    }
});

app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 작동 중입니다.`));

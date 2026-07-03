const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/meal', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "날짜가 필요합니다." });

    // ⚠️ [체크!]여기에 따옴표 "" 가 깨지진 않았는지, 키 앞뒤로 띄어쓰기(공백)가 들어가진 않았는지 꼭 확인해줘!
    const KEY = "
c16796f70d5548eda72297864e079f4e
"; 
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=8750475&MLSV_YMD=${date}&KEY=${KEY}`;

    try {
        const response = await axios.get(url);
        // 정상 응답과 함께 요청한 URL 구조를 같이 보여줍니다.
        res.json({
            status: "성공",
            request_date: date,
            neis_data: response.data
        }); 
    } catch (error) {
        // 💥 에러가 나면 어떤 에러인지 상세하게 화면에 띄웁니다.
        res.status(500).json({ 
            status: "실패", 
            message: error.message,
            neis_raw_error: error.response ? error.response.data : "나이스 서버 응답 없음"
        });
    }
});

app.listen(PORT);

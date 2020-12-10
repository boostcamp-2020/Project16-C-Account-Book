// type ParsedSMS = {
//   cardname:string,
//   amount:number
//   date:string
//   time: string;
//   transactionType: string;
//   cardType: string;
//   isDeposit: Boolean;
// };

//팀에서 서비스에 맞게 추가. 현재는 각 서비스에 있는 결제 수단을 모두 넣은  것.
const paymentList = [
  '신한',
  '국민',
  'KB',
  '농협',
  'BC',
  '현대',
  '우리',
  'KG',
  'NH',
];

// 위에 것이랑 둘 중 하나만 써도 됨. 매핑시키기 위한 것.
const cardObj = {
  신한: '신한카드',
  국민: '국민카드',
  KB: 'KB 국민카드',
  NH: '농협카드',
  농협: '농협카드',
  BC: 'BC Card',
  현대: 'Hyundai',
  우리: 'WOORI Card',
  KG: 'KG이니시스',
};

const getDataFromSMS = sms => {
  const newData = {};

  //승인, 취소, 거절을 구분하는 변수
  const transactionTypeToken = sms.match('취소|거절');
  newData['transactionType'] = transactionTypeToken
    ? transactionTypeToken[0]
    : '승인';

  if (newData['transactionType'] === '거절') {
    return newData;
  }

  const isDepositToken = sms.match('입금');
  newData['isDeposit'] =
    isDepositToken || newData['transactionType'] === '취소' ? true : false;

  // 카드타입! 얘를 어떻게 처리하면 좋을지?
  const cardTypeToken = sms.match('체크');
  newData['cardType'] = cardTypeToken ? cardTypeToken[0] : '신용';

  const parsedSMSDatas = parseSMS(sms);
  parsedSMSDatas.forEach((data, i) => {
    if (i === 0) {
      const cardName = data
        .replace(/[\[\]]/gi, '')
        .substring(0, 2)
        .toUpperCase();

      newData['cardname'] = cardObj[cardName];
    }
    if (data.includes('원') && !newData['amount']) {
      newData['amount'] = Number(
        data.match(/[0-9]+(,?[0-9]+)+/)[0].replace(',', ''),
      );
      return;
    }
    if (data.includes(':')) {
      newData['time'] = data.match(/[0-9]{2}:[0-9]{2}/)[0];
    }
    if (data.includes('/')) {
      newData['date'] = data.match(/[0-9]{2}\/[0-9]{2}/)[0];
    }
  });
  return newData;
};

const parseSMS = string => {
  return string
    .replace(/\[web발신\]/i, '')
    .trim()
    .split(/[\s\n\r]/g)
    .filter(e => e);
};

export default getDataFromSMS;

const message = `[WEB발신]
[kg이니시스]
04/12 21:13
464,000원 익월
합산요금청구`;

// console.log(getDataFromSMS(message));

// 밑은 test 코드인데 제가 툴이 안 깔려 있어 일단 주석 처리 하였습니다.

// test('solution', () => {
//   expect(
//     solution(`[WEB발신]
//     [kg이니시스]
//     04/12 21:13
//     464,000원 익월
//     합산요금청구`)
//   ).toEqual({
//     cardname: 'KG',
//     amount: 464000,
//     date: '04/12',
//     time: '21:13',
//     transactionType: '승인',
//     cardType: '신용',
//     isDeposit: false,
//   });

//   expect(
//     solution(`[WEB발신]
//       KB국민카드 김영근님 06/07
//       09:22 5000원
//       결제 승인`)
//   ).toEqual({
//     cardname: 'KB',
//     amount: 5000,
//     date: '06/07',
//     time: '09:22',
//     transactionType: '승인',
//     cardType: '신용',
//     isDeposit: false,
//   });

//   expect(
//     solution(`[Web발신]
//       농협 입금 200원
//       06/11 22:29 123-1234-4567-12
//       잔액 200000원`)
//   ).toEqual({
//     cardname: '농협',
//     amount: 200,
//     date: '06/11',
//     time: '22:29',
//     transactionType: '승인',
//     cardType: '신용',
//     isDeposit: true,
//   });

//   expect(
//     solution(`농협 출금 5000원
//       08/31 19:01 123-1234-1234-12
//       잔액 200000원`)
//   ).toEqual({
//     cardname: '농협',
//     amount: 5000,
//     date: '08/31',
//     time: '19:01',
//     transactionType: '승인',
//     cardType: '신용',
//     isDeposit: false,
//   });

//   expect(
//     solution(`현대 ZERO 승인
//     2,500원 일시불
//     04/10 13:15
//     코레일유통서울지사
//     누적 560,852원
//     0.7%할인`)
//   ).toEqual({
//     cardname: '현대',
//     amount: 2500,
//     date: '04/10',
//     time: '13:15',
//     transactionType: '승인',
//     cardType: '신용',
//     isDeposit: false,
//   });

//   expect(
//     solution(`[Web발신]
//       [신한체크승인] 최*희(7062)
//       02/10 13:10
//       (금액)1,000원 PAYCO`)
//   ).toEqual({
//     cardname: '신한',
//     amount: 1000,
//     date: '02/10',
//     time: '13:10',
//     transactionType: '승인',
//     cardType: '체크',
//     isDeposit: false,
//   });

//   expect(
//     solution(`롯데3121 승인
//     5,200원 일시불
//     09/15 18:31
//     월드크리닝 롯데마트`)
//   ).toEqual({
//     cardname: '롯데',
//     amount: 5200,
//     date: '09/15',
//     time: '18:31',
//     transactionType: '승인',
//     cardType: '신용',
//     isDeposit: false,
//   });

//   expect(
//     solution(`[Web발신]
//     우리(4575)승인취소
//     임*봉님
//     4562원 일시불
//     12/07 20:29
//     네이버페이
//     누적123,456원`)
//   ).toEqual({
//     cardname: '우리',
//     amount: 4562,
//     date: '12/07',
//     time: '20:29',
//     transactionType: '취소',
//     cardType: '신용',
//     isDeposit: true,
//   });

//   expect(
//     solution(`[Web발신]
//     우리(8804) 체크승인
//     윤*우님
//     10,000원
//     11/03 10:03
//     스타벅스코리아`)
//   ).toEqual({
//     cardname: '우리',
//     amount: 10000,
//     date: '11/03',
//     time: '10:03',
//     transactionType: '승인',
//     cardType: '체크',
//     isDeposit: false,
//   });

//   expect(
//     solution(`[Web발신]
//     KB국민체크
//     윤*우님
//     06/08 08:57
//     28,440원
//     11PAY 인증
//     승인취소
//     `)
//   ).toEqual({
//     cardname: 'KB',
//     amount: 28440,
//     date: '06/08',
//     time: '08:57',
//     transactionType: '취소',
//     cardType: '체크',
//     isDeposit: true,
//   });
// });

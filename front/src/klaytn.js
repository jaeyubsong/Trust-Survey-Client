import Web3 from 'web3';
import compiledContract from './contracts/TrustSurvey.json'; // solc
// import * as cav from 'caver-js';

// 니즈 1. 클레이튼에 올라간 컨트랙트의 API 를 호출하고 싶다.
// 니즈 2. 메타마스크 연동을 잘 하고 싶다.

// 첫번째 시도. caver.js 를 쓰자. (클레이튼이 공식으로 지원하는 클레이튼 버전 web3.js)

// 클레이튼에 문서화가 잘 되어있는 caver.js 를 사용하면 되긴 함 (우리는 web3.js 를 쓰고 있음)
// caver.js 를 쓰려고 하니 생기는 문제점
// 1. 메타마스크 연동이 안 됨
// 2. caver.js 를 import 하려고 하니 webpack 관련 에러가 생김

// 두번째 시도. ethereum 에 대한 예시가 많이 있는 web3.js 를 클레이튼에서도 쓸 순 없나?
// why? 클레이튼 특징 - 이더리움 호환성이 있다. 그러면 web3.js 도 쓸 수 있으려나?!

// 결론 -> 쓸 수 있다. (라고 하는 클레이튼 포럼 글 https://forum.klaytn.foundation/t/topic/4398)

// 그렇게 해서, 요 코드는 web3.js 를 통해서 클레이튼 컨트랙트와 소통하는 예시 코드입니다.


async function initKlaytn(abi) {
  // metamask 가 연동되었는지 체크하는 방법
  // https://ethereum.stackexchange.com/questions/44601/how-to-check-whether-metamask-is-installed
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
  window.web3 = new Web3(window.ethereum);

  // 편한 테스트를 위해 window 에 추가함.
  // 실제로는 이 파일 scope 의 변수에 넣고 함수 wrapper 들만 export 하는게 좋을 듯.
  window.web3_ = {};
  window.web3_.account = accounts[0];
  window.web3_.TrustSurveyContract = new window.web3.eth.Contract(abi, '0x64F9505Ecf8e701698Bfdc80787b228c35B8Da6D');
  // ex. web3_.registerSurvey("0x12345678", "0xffff", 2, 5)
  window.web3_.registerSurvey = (surveyId, qHash, reward, maxParticipants) => {
    // window.web3_.TrustSurveyContract.methods.participateSurvey(...)
    return window.web3_.TrustSurveyContract.methods.registerSurvey(surveyId, qHash, reward, maxParticipants)
            .send({
              from:window.web3_.account,
              gas: 200000, // arbitrary gaslimit based on https://github.com/klaytn/countbapp/blob/main/src/components/Count.js
              value: reward * maxParticipants * 1000000000000000000, // reward * maxParticipants * 1 KLAY
            })
            .on('receipt', (receipt) => {
              console.log(receipt);
            })
            .on('error', (error) => {
              console.log(error); // 실제로 찍힙니다 많이 실패해봤어요
            });
  }

  /* 컨트랙트 API 호출 테스트 용 getBalance, deposit */
  // window.web3_.getBalance = () => {
  //   return window.web3_.TrustSurveyContract.methods.getBalance()
  //     .call()
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(e => console.error(e));
  // }

  // 현재는 컨트랙트에서의 require(msg.sender == owner) 를 만족하지 못해서 실패.
  // transaction 의 gasprice 등을 확인하는 용도로만 사용했음.
  // window.web3_.deposit = (klay) => {
  //   return window.web3_.TrustSurveyContract.methods.deposit()
  //     .send({ from:window.web3_.account, value: klay * 1000000000000000000, gas: 200000 })
  //     .on('receipt', (receipt) => {
  //       console.log(receipt);
  //     })
  //     .on('error', (error) => {
  //       console.log(error);
  //     });
  // }
}

const abi = compiledContract.abi;

export { abi, initKlaytn };
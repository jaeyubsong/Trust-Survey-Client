import Web3 from 'web3';
import compiledContract from './contracts/TrustSurvey.json';

async function initKlaytn(abi) {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
  window.web3 = new Web3(window.ethereum);

  // 편한 테스트를 위해 window 에 추가함.
  // 실제로는 이 파일 scope 의 변수에 넣고 함수 wrapper 들만 export 하는게 좋을 듯.
  window.web3_ = {};
  window.web3_.account = accounts[0];
  window.web3_.TrustSurveyContract = new window.web3.eth.Contract(abi, '0x64F9505Ecf8e701698Bfdc80787b228c35B8Da6D');
  // ex. web3_.registerSurvey("0x12345678", "0xffff", 2, 5)
  window.web3_.registerSurvey = (surveyId, qHash, reward, maxParticipants) => {
    return window.web3_.TrustSurveyContract.methods.registerSurvey(surveyId, qHash, reward, maxParticipants)
            .send({
              from: window.web3_.account,
              gas: 200000, // arbitrary gaslimit based on https://github.com/klaytn/countbapp/blob/main/src/components/Count.js
              value: reward * maxParticipants * 1000000000000000000, // reward * maxParticipants * 1 KLAY
            })
            .on('receipt', (receipt) => {
              console.log(receipt);
            })
            .on('error', (error) => {
              console.log(error);
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
  //     .send({ from: window.web3_.account, value: klay * 1000000000000000000, gas: 200000 })
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
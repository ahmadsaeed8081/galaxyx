/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Loader from "../../components/Loader";

import Wrapper from "../../routes/Wrapper";
import Token from "../../components/Token/Token";
import Update from "../../components/Update/Update";
import Hero from "./Hero";
import InvestWithdraw from "../../components/InvestWithdraw";
import InvestmentHistory from "../../components/InvestmentHistory";
import Referral from "../../components/Referral/Referral";
import Stake from "../../components/Stake/Stake";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  cont_address,
  cont_abi,
  tokenABI,
  Token_address,
  usdt_address
} from "../../../src/components/config";
import Web3 from "web3";
import { useLocation } from "react-router-dom";

import { CopyIcon, RocketIcon2 } from "../../assets/Icons";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction, usePublicClient } from 'wagmi'
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
const Main = () => {

  let buying_price=0.02;
  let selling_price=0.015;
  const { address, isConnecting ,isDisconnected} = useAccount()
  const { chain } = useNetwork()


  const [loader, setLoader] = useState(false);
  const [isWalletConnected, setisWalletConnected] = useState(false);
  const [investment, setInvestment] = useState("");
  const [ROI, set_ROI] = useState(0);
  const [Expected_return, set_Expected_return] = useState(0);
  const [curr_time, set_curr_time] = useState(0);
  const [total_withdraw_reaward, set_total_withdraw_reaward] = useState(0);
  const [withdraw_Amount, set_withdraw_Amount] = useState("");
  const [buying_Amount, set_buying_Amount] = useState("0");
  const [selling_Amount, set_selling_Amount] = useState("0");

  const [after_Withdraw, set_after_withdraw] = useState("");
  const [result, set_result] = useState("");

  const [totlaInvestment, setTotalInvestment] = useState(0);
  const [totalReward, setwithrawableAmount] = useState("0");
  const [totalEarning, set_totalEarning] = useState("0");

  const [ref_data, set_Ref_data] = useState("0");
  const [ref_data1, set_Ref_data1] = useState("0");
  const [balance, setBalance] = useState(0);
  const [usdt_balance, set_usdtBalance] = useState(0);

  const [minimum_investment, set_minimum_investment] = useState(0);
  const [Allinvestment, set_Allinvestment] = useState([]);
  const [Allinvestment_earning, set_Allinvestment_earning] = useState([]);

  const [totalbusiness, setbusiness] = useState("0");

  const [totalReferrals, settotalReferrals] = useState(0);
  const [referral, setReferral] = useState("0x0000000000000000000000000000000000000000");
  const [ref_from, set_ref_from] = useState("0");

  const [user, setUser] = useState("Connect your wallet");

  const [state, setState] = useState({
    days: 0,
    minutes: 0,
    hours: 0,
    seconds: 0,
    time_up: "",
    // bid_time: selectedAmount,
  });

  const CHAIN_ID = "80001";
  // const CHAIN_ID = "0x38";


  useEffect(() => {
    if(address)
    {
      mount();

    }
  }, [ address]);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("ref");

  const count = (_deadline) => {
    console.log("here is deadine "+_deadline)
    var now = new Date().getTime();
    _deadline = Number(_deadline) * 1000;
    var t;
    if ( Number(now) <  Number(_deadline)) {
      t = Number(_deadline) - Number(now);
      console.log(" its count " + _deadline + "   " + now + "   " + t);
      // console.log(deadline)
      var dd = Math.floor(t / (1000 * 60 * 60 * 24));
      var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var ss = Math.floor((t % (1000 * 60)) / 1000);

      var days = dd < 10 ? "0" + dd : dd;
      var hours = hh < 10 ? "0" + hh : hh;
      var minutes = mm < 10 ? "0" + mm : mm;
      var seconds = ss < 10 ? "0" + ss : ss;

      //  setState({ days, minutes, hours, seconds });
      console.log("innu8ni " + days);

      // if (t < 0) {
      //   setState({
      //     days: 0,
      //     minutes: 0,
      //     hours: 0,
      //     seconds: 0,
      //     time_up: "TIME IS UP",
      //   });

      //   // clearInterval(x);
      //   // var today = new Date();
      //   // today.setDate(today.getDate(Date) + 2);
      //   // deadline = today.getTime(Date);
      //   // return
      // }
      if (days > 0) {
        return Number(days)+1 + " days";
      } else if (hours > 0) {
        return Number(hours)+1 + " hours";
      } else if (minutes > 0) {
        return Number(minutes)+1 + " minutes";
      } else {
        return Number(seconds)+1 + " seconds";
      }
    } else {
      return "Expired";
    }
  };
//   const {  data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdraw } = useContractWrite({
 
//     address: cont_address,
//     abi: cont_abi,
//     functionName: 'withdrawReward',
//     args:[((Number(withdraw_Amount))*10**18).toString()],


// })

const {
  data: stakeResult,
  isLoading: isLoading_stake,
  isSuccess: stakeSuccess,
  write: Investing,
} = useContractWrite({
  address: cont_address,
  abi: cont_abi,
  functionName: 'invest',
  args: [Convert_To_Wei(Number(investment))],
  onSuccess(data) {
    mount();
    console.log('Success', data)
  },
});


const {
  data: buyResult,
  isLoading: isLoading_buy,
  isSuccess: buySuccess,
  write: BuyToken,
} = useContractWrite({
  address: cont_address,
  abi: cont_abi,
  functionName: 'BuyToken',
  args: [Convert_To_Wei(Number(buying_Amount)/Number(buying_price)),referral],
  onSuccess(data) {
    mount();
    console.log('Success', data)
  },
});

const {
  data: sellResult,
  isLoading: isLoading_sell,
  isSuccess: sellSuccess,
  write: sell_Token,
} = useContractWrite({
  address: cont_address,
  abi: cont_abi,
  functionName: 'SellToken',
  args: [Convert_To_Wei(Number(selling_Amount))],
  onSuccess(data) {
    mount();
    console.log('Success', data)
  },
});

const { config: appConfig } = usePrepareContractWrite({
  address: Token_address,
  abi: tokenABI,
  functionName: "approve",
  args: [cont_address,Convert_To_Wei(Number(investment))],
});

const { config: usdtConfig } = usePrepareContractWrite({
  address: usdt_address,
  abi: tokenABI,
  functionName: "approve",
  args: [cont_address,Number(buying_Amount*10**18)],
});

const { config: TokenConfig } = usePrepareContractWrite({
  address: Token_address,
  abi: tokenABI,
  functionName: "approve",
  args: [cont_address,Number(selling_Amount*10**18)],
});

const {
  data: data_app,
  isLoading: isLoading_app,
  isSuccess: isSuccess_app,
  write: approval,
} = useContractWrite(appConfig);

const {
data: data_token,
isLoading: isLoading_token,
isSuccess: isSuccess_token,
write: approval_token,
} = useContractWrite(TokenConfig);


const {
  data: data_usdt,
  isLoading: isLoading_usdt,
  isSuccess: isSuccess_usdt,
  write: usdt_approval,
} = useContractWrite(usdtConfig);

const { config:claimRewardConfig } = usePrepareContractWrite({
  address: cont_address,
  abi: cont_abi,
  functionName: 'withdrawReward',
  args: [Convert_To_Wei(Number(withdraw_Amount))],

})
const { data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdraw } = useContractWrite(claimRewardConfig)




const { chains, error, isLoading, pendingChainId, switchNetwork:reward_switch } =
useSwitchNetwork({
  chainId: CHAIN_ID,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    withdraw?.()
  }

})
// const { switchNetwork: stake_switch } = useSwitchNetwork({
//   chainId: CHAIN_ID,
//   // throwForSwitchChainNotSupported: true,
//   onSuccess() {
//     approval?.();
//   },
// });

const {switchNetwork:stake_switch } =
useSwitchNetwork({
  chainId: CHAIN_ID,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    approval?.();
  }

})

const {switchNetwork:buy_switch } =
useSwitchNetwork({
  chainId: CHAIN_ID,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    usdt_approval?.();
  }

})


const {switchNetwork:sell_switch } =
useSwitchNetwork({
  chainId: CHAIN_ID,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    approval_token?.();
  }

})

  const waitForTransaction = useWaitForTransaction({
    hash: data_app?.hash,
    onSuccess(data) {
      Investing?.();
      console.log("Success", data);
    },
  });

  const waitForTransaction_buy = useWaitForTransaction({
    hash: data_usdt?.hash,
    onSuccess(data) {
      BuyToken?.();
      console.log("Success", data);
    },
  });
  const waitForTransaction_sell = useWaitForTransaction({
    hash: data_token?.hash,
    onSuccess(data) {
      sell_Token?.();
      console.log("Success", data);
    },
  });
// const waitForTransaction = useWaitForTransaction({
//   hash: stakeResult?.hash,
//   onSuccess(data) {
//     mount();
//     console.log("Success", data);
//   },
// });

const waitForTransaction3 = useWaitForTransaction({
  hash: stakeResult?.hash,
  onSuccess(data) {
    mount();
    console.log("Success", data);
  },
});

const waitForTransaction2 = useWaitForTransaction({
  hash: stakeResult_withdrawReward?.hash,
  onSuccess(data) {
    mount();
    console.log("Success", data);
  },
});



  function Convert_To_Wei(val) {
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor-rpc.publicnode.com	"));
  
    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }
  async function mount() {
    if (isDisconnected) {
      return;
    }
    try {
      console.log("my balanace mount "+address);
      setLoader(true)
      const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor-rpc.publicnode.com	"));

      // const balance = await web3.eth.getBalance(address);


      const networkId = await web3.eth.net.getId();

      const contract = new web3.eth.Contract(cont_abi, cont_address);
      const contract1 = new web3.eth.Contract(tokenABI, Token_address);
      const contract_usdt = new web3.eth.Contract(tokenABI, usdt_address);

      let balance = await contract1.methods.balanceOf(address).call();
      let usdt_balance = await contract_usdt.methods.balanceOf(address).call();
      setBalance(balance);
      set_usdtBalance(usdt_balance);
      // balance = web3.utils.fromWei(balance, "ether");
      // alert("my balanace "+balance);
      let totalReward = await contract.methods
        .getReward()
        .call({ from: address.toString() });
      console.log(address + "iyts acc");

      let total_earn = await contract.methods
        .get_Total_Earning()
        .call({ from: address.toString() });
      console.log(address + "iyts acc");

      var ref_data = await contract.methods
        .referralLevel_earning()
        .call({ from: address.toString() }); //arrray

      const ref_data1 = await contract.methods
        .referralLevel_count()
        .call({ from: address.toString() }); //array

      let totalInvest = await contract.methods
        .getTotalInvestment()
        .call({ from: address.toString() });

      const business = await contract.methods
        .totalbusiness()
        .call({ from: address.toString() });

      const totalReferral = await contract.methods
        .TotalReferrals()
        .call({ from: address.toString() });

      const total_withdraw_reaward = await contract.methods
        .total_withdraw_reaward()
        .call({ from: address.toString() });

      // const allInvestments = await contract.methods
      //   .getAllinvestments()
      //   .call({ from: address.toString() });
      const allInvestments = await contract.methods
      .getAllinvestments()
      .call({ from: address.toString() });
      let arr = [];
      for (let i = 0; i < allInvestments.length; i++) {
        console.log("helo " + allInvestments[i][3]);
        let Reward = await contract.methods
          .getReward_perInvestment(allInvestments[i][3])
          .call({ from: address.toString() });
        Reward = web3.utils.fromWei(Reward, "ether");

        arr[i] = Reward;
      }
      console.log("inv " +allInvestments.length);
      const all_Investments=[...allInvestments].reverse()

      totalInvest = web3.utils.fromWei(totalInvest, "ether");
      total_earn = web3.utils.fromWei(total_earn, "ether");

      set_Allinvestment_earning(arr);
      set_totalEarning(total_earn);
      let minimum_investment = await contract.methods
        .minimum_investment()
        .call(); //get stake

      // const totalinvestors = await contract.methods.totalInvestors().call(); //get stake

      const curr_time = await contract.methods.get_currTime().call(); //get stake

      console.log("minim inv "+ minimum_investment );

      minimum_investment = web3.utils.fromWei(minimum_investment, "ether");

      totalReward = web3.utils.fromWei(totalReward, "ether");

      if (id != null) {


        setReferral(id);
      }
      

      set_Allinvestment(all_Investments);
      set_curr_time(curr_time);
      setTotalInvestment(totalInvest);
      setwithrawableAmount(totalReward);
      set_minimum_investment(minimum_investment);
      set_total_withdraw_reaward(total_withdraw_reaward);
      setisWalletConnected(true);
      setbusiness(business);
      settotalReferrals(totalReferral);
      set_Ref_data(ref_data);
      set_Ref_data1(ref_data1);
      set_ref_from(ref_from[0]);
      setLoader(false);

      
      setUser(address);
      console.log("its id " + referral);

    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  }




  function cal_after_withdraw(_withdraw_Amount) {
    if (Number(_withdraw_Amount) < Number(totalReward)) {
      set_after_withdraw(totalReward - _withdraw_Amount);
    } else if (Number(_withdraw_Amount) > Number(totalReward)) {
      set_after_withdraw(0);
    }
  }

  function find_Exp_usdt(amount) {

    // var selling_price=0.015;
   return  selling_Amount*selling_price;

  }
  function find_Exp_Token(amount) {
    // var buying_price=0.02;
   return  buying_Amount/buying_price;
    // return 0;

  }



  function find_Exp_earn(amount) {

    if (Number(amount) >= Number(minimum_investment) && amount < 100) {
      return (amount / 100) * 1.2 * 334;
    } else if (amount >= 100 && amount < 1000) {
      return (amount / 100) * 1.2 * 334;
    } else if (amount >= 1000 && amount < 10000) {
      return (amount / 100) * 1.2 * 334;
    } else if (amount >= 10000) {
      return (amount / 100) * 1.2 * 334;
    }
    return 0;

  }

  function find_Roi(amount) {
    if (Number(amount) >= Number(minimum_investment) && amount < 100) {
      // alert("amount "+ amount+"   "+"minim "+ minimum_investment)
      return  1.2;
    } else if (amount >= 100 && amount < 1000) {
      return 1.2 ;
    } else if (amount >= 1000 && amount < 10000) {
      return 1.2;
    } else if (amount >= 10000) {
      return 1.2 ;
    }
    return 0;
  }

  async function Invest() {
    if (isDisconnected) {
      alert("kindly connect your wallet");
      return

    }
    if (investment <= 0 || investment == "") {
      alert("please write amount ");
      return
    }

    if (Number(balance) < Number(investment*10**18)) {
      alert("you dont have enough balance to invest");
      return;
    } 
    if (Number(investment) < Number(minimum_investment)) {
      alert("you can't stake less than " + minimum_investment);
      return;
    }

    if (chain.id != CHAIN_ID) {
      stake_switch?.();
    } else {

      approval?.()
    }





  }
  // props.provider.on('chainChanged', hello);
  // props.provider.ethereum.on('accountsChanged', hello )

  // function hello() {
  //   window.location.reload();
  // }


  async function WithdrawReward() {


        if (isDisconnected) {
          alert("kindly connect your wallet");
          return
    
        }
        if (withdraw_Amount <= 0 || withdraw_Amount == "") {
          alert("please write amount ");
          return
        }
        if (Number(totalEarning)==0) {
          alert("You don't have earning to withdraw");
          return;
        }
        if (Number(withdraw_Amount) > Number(totalEarning)) {
          alert("you cant withdraw more than your current balance");
          return;
        }

        // Use web3 to get the user's accounts.
        if (chain.id != CHAIN_ID) {
          reward_switch?.();
        } else {
          console.log("object withdraw "+withdraw_Amount);

          withdraw?.()
        }

  }

   function purchaseToken() {
    if (isDisconnected) {
      alert("kindly connect your wallet");
      return

    }
    if (buying_Amount <= 0 || buying_Amount == "") {
      alert("please write amount ");
      return
    }
    if (Number(usdt_balance) < Number((buying_Amount*(buying_price*10**18)))) {
      alert("you dont have enough balance to Buy");
      return;
    } 


    if (chain.id != CHAIN_ID) {
      buy_switch?.();
    } else {

      usdt_approval?.()
    }





  }

  async function sellToken()
  {
    if (isDisconnected) {
      alert("kindly connect your wallet");
      return

    }
    if (selling_Amount <= 0 || selling_Amount == "") {
      alert("please write amount ");
      return
    }

    if (Number(balance) < Number(selling_Amount*10**18)) {
      alert("you dont have enough Tokens to Sell");
      return;
    } 

    // console.log("object invest "+ ((Number(investment))*10**18).toString());

    if (chain.id != CHAIN_ID) {
      sell_switch?.();
    } else {

      approval_token?.()
    }

  }


  return (
    <Wrapper>
      <Hero find_Exp_usdt={find_Exp_usdt} find_Exp_Token={find_Exp_Token} buying_Amount={buying_Amount} set_buying_Amount={set_buying_Amount} selling_Amount={selling_Amount} set_selling_Amount={set_selling_Amount} purchaseToken={purchaseToken} sellToken={sellToken} cont_address={cont_address} />
      <InvestWithdraw  ROI={ROI} withdraw_Amount={withdraw_Amount} setInvestment={setInvestment}set_ROI={set_ROI}find_Exp_earn={find_Exp_earn}find_Roi={find_Roi}minimum_investment={minimum_investment}set_Expected_return={set_Expected_return}Expected_return={Expected_return}Invest={Invest}set_withdraw_Amount={set_withdraw_Amount}total_withdraw_reaward={total_withdraw_reaward}cal_after_withdraw={cal_after_withdraw}after_Withdraw={after_Withdraw}WithdrawReward={WithdrawReward}investment={investment}totlaInvestment={totlaInvestment}totalEarning={totalEarning}totalReward={totalReward}totalReferrals={totalReferrals}address={address} />
      <InvestmentHistory Allinvestment={Allinvestment} Allinvestment_earning={Allinvestment_earning} count={count} find_Roi={find_Roi} isWalletConnected={isWalletConnected}/>
      <Referral ref_data1={ref_data1} ref_data={ref_data}/>
      <Stake />
      <Token />
      <Update />
      {loader && <Loader />}

    </Wrapper>
  );
};

export default Main;

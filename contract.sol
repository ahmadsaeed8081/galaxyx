//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Token{
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    }
    
contract Proxiable {
    // Code position in storage is keccak256("PROXIABLE") = "0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7"

    function updateCodeAddress(address newAddress) internal {
        require(
            bytes32(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7) == Proxiable(newAddress).proxiableUUID(),
            "Not compatible"
        );
        assembly { // solium-disable-line
            sstore(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7, newAddress)
        }
    }

    function proxiableUUID() public pure returns (bytes32) {
        return 0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7;
    }
} 

contract Galaxy is Proxiable
    {

        struct allInvestments{

            uint investedAmount;
            uint expire_Time;
            uint DepositTime;  
            uint investmentNum;
            uint unstakeTime;
            bool unstake;
            uint category;


        }
        struct ref_data{
            uint reward;
            uint count;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        }

        struct Data{

            mapping(uint=>allInvestments) investment;
            address[] hisReferrals;
            address referralFrom;
            mapping(uint=>ref_data) referralLevel;
            uint reward;
            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
            uint stakeTime;
            uint TotalReferrals_earning;
        }
        
        uint public minimum_investment;
        uint public buying_price;
        uint public selling_price;


        address public Token_address;
        address public usdt_address;

        address public owner;

        uint public totalbusiness; 
        uint public investmentPeriod;
        uint  divider;

        

        mapping(uint=>uint) public category_percentage;
        mapping(address=>Data) public user;
        uint[] public arr;
        uint[] public percentage;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to perform this action");
        _;
    }      

     constructor()
     
     {

        owner=msg.sender;

        minimum_investment=10000000000000000000;
        buying_price=20000000000000000;
        selling_price=15000000000000000;


        Token_address=0xcC143Bf065D91FBBCe858D76E823B65c2045d7d3;
        usdt_address=0x55d398326f99059fF775485246999027B3197955;

        totalbusiness; 
        investmentPeriod=334 days;
        divider=60 minutes;

        arr=[50000000000000000,50000000000000000,50000000000000000,50000000000000000];
        percentage = [5 ether,4 ether,3 ether,2 ether,1 ether];

        for(uint i=0;i<4;i++)
        {
            category_percentage[i]=arr[i];
        }


    }



         function sendRewardToReferrals(address investor,uint _investedAmount)  internal  //this is the freferral function to transfer the reawards to referrals
        { 

            address temp = investor;       

            for(uint i=0;i<5;i++)
            {
                
                if(user[temp].referralFrom!=address(0))
                {
                    if(i==0)
                    {
                        
                    }

                    temp=user[temp].referralFrom;
                    uint reward1 = (percentage[i] * _investedAmount)/100000000000000000000;

                    user[temp].TotalReferrals_earning+=reward1 ;                  
                    user[temp].referralLevel[i].reward+=reward1;
                    user[temp].referralLevel[i].count++;


                } 
                else{
                    break;
                }

            }

        }



        function define_category(uint amount) pure internal returns(uint){
            if(amount>=10000000000000000000 && amount<100000000000000000000)
            {
                return 0;
            }
            else if(amount>=100000000000000000000 && amount<1000000000000000000000)
            {
                return 1;

            }
            else if(amount>=1000000000000000000000 && amount<10000000000000000000000)
            {
                return 2;

            }
            else if(amount>=10000000000000000000000)
            {
                return 3;

            }
            
            return 100;
        }

       function BuyToken(uint token,address _referral) external  returns(bool)
       {
            require(Token(usdt_address).allowance(msg.sender,address(this))>=((buying_price * token)/10**18));

            require(Token(usdt_address).balanceOf(msg.sender)>=((buying_price * token)/10**18));
            

            uint amount50= ((((buying_price * token)/(10**18))*(50*10**18))/(100*10**18));

            Token(usdt_address).transferFrom(msg.sender,address(this),amount50);
            Token(usdt_address).transferFrom(msg.sender,owner,amount50);

            Token(Token_address).transfer(msg.sender,token);

            if(user[msg.sender].referralFrom!=address(0))
            {
                sendRewardToReferrals(msg.sender,((buying_price * token)/10**18));      

            }
            else if(_referral==address(0) || _referral==msg.sender)                                         //checking that investor comes from the referral link or not
            {

                user[msg.sender].referralFrom = address(0);
            }
            else
            {
                
                user[msg.sender].referralFrom = _referral;
                user[_referral].hisReferrals.push(msg.sender);
                sendRewardToReferrals(msg.sender,((buying_price * token)/10**18));      //with this function, sending the reward to the all 12 parent referrals

                
            }



            return true;
       }

       function SellToken(uint token) external  returns(bool)
       {
           require(Token(Token_address).allowance(msg.sender,address(this))>=token);

            require(Token(Token_address).balanceOf(msg.sender)>=token);
            
            Token(Token_address).transferFrom(msg.sender,address(this),token);
            Token(usdt_address).transfer(msg.sender,((selling_price * token)/10**18));

            return true;
       }
       


       function invest(uint _investedamount) external  returns(bool)
       {
            require(_investedamount>=minimum_investment,"you cant invest less than minimumum investment");

            require(Token(Token_address).balanceOf(msg.sender)>=_investedamount,"you dont have enough usdt");
            require(Token(Token_address).allowance(msg.sender,address(this))>=_investedamount,"kindly appprove the USDT");

            Token(Token_address).transferFrom(msg.sender,address(this),_investedamount);

            uint num = user[msg.sender].noOfInvestment;
            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].category= define_category(_investedamount);
            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].expire_Time=block.timestamp + investmentPeriod ;  // 60 days
            user[msg.sender].investment[num].investmentNum=num;
            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;

            return true;
        }

        function getReward() view public returns(uint){ //this function is get the total reward balance of the investor
            uint totalReward;
            uint depTime;
            uint rew;
            uint temp = user[msg.sender].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(user[msg.sender].investment[i].expire_Time >block.timestamp)
                {
                    if(!user[msg.sender].investment[i].unstake)
                    {
                        depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                       

                    }
                    else{

                        depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;

                    }
                }
                else{

                    if(!user[msg.sender].investment[i].unstake)
                    {
                        depTime =user[msg.sender].investment[i].expire_Time - user[msg.sender].investment[i].DepositTime;

                    }
                    else{
                        if(user[msg.sender].investment[i].unstakeTime > user[msg.sender].investment[i].expire_Time)
                        {
                            depTime =user[msg.sender].investment[i].expire_Time - user[msg.sender].investment[i].DepositTime;

                        }
                        else{

                            depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;

                        }


                    }

                }
          
                depTime=depTime/divider; //1 day

                if(depTime>0)
                {
                    rew  = ((user[msg.sender].investment[i].investedAmount)*category_percentage[user[msg.sender].investment[i].category])/100000000000000000000;

                    totalReward += depTime * rew;

                }
            }
            totalReward += user[msg.sender].TotalReferrals_earning;

            totalReward -= user[msg.sender].totalWithdraw_reward;

            return totalReward;
        }


        function get_Total_Earning() view public returns(uint){ //this function is get the total reward balance of the investor
            uint totalReward;
            uint depTime;
            uint rew;
            uint temp = user[msg.sender].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(user[msg.sender].investment[i].expire_Time >block.timestamp)
                {
                    if(!user[msg.sender].investment[i].unstake)
                    {
                        depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                       

                    }
                    else{

                        depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;

                    }
                }
                else{

                    if(!user[msg.sender].investment[i].unstake)
                    {
                        depTime =user[msg.sender].investment[i].expire_Time - user[msg.sender].investment[i].DepositTime;

                    }
                    else{
                        if(user[msg.sender].investment[i].unstakeTime > user[msg.sender].investment[i].expire_Time)
                        {
                            depTime =user[msg.sender].investment[i].expire_Time - user[msg.sender].investment[i].DepositTime;

                        }
                        else{

                            depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;

                        }


                    }

                }
          
                depTime=depTime/divider; //1 day
                if(depTime>0)
                {
                    rew  = ((user[msg.sender].investment[i].investedAmount)*category_percentage[user[msg.sender].investment[i].category])/100000000000000000000;

                    totalReward += depTime * rew;

                }
            }
                totalReward += user[msg.sender].TotalReferrals_earning;


            return totalReward;
        }





        function getReward(address _investor) view public returns(uint){ //this function is get the total reward balance of the investor
            uint totalReward;
            uint depTime;
            uint rew;
            uint temp = user[_investor].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(user[_investor].investment[i].expire_Time >block.timestamp)
                {
                    if(!user[_investor].investment[i].unstake)
                    {
                        depTime =block.timestamp - user[_investor].investment[i].DepositTime;

                    }
                    else{

                        depTime =user[_investor].investment[i].unstakeTime - user[_investor].investment[i].DepositTime;

                    }
                }
                else{

                    if(!user[_investor].investment[i].unstake)
                    {
                        depTime =user[_investor].investment[i].expire_Time - user[_investor].investment[i].DepositTime;

                    }
                    else{
                        if(user[_investor].investment[i].unstakeTime > user[_investor].investment[i].expire_Time)
                        {
                            depTime =user[_investor].investment[i].expire_Time - user[_investor].investment[i].DepositTime;

                        }
                        else{

                            depTime =user[_investor].investment[i].unstakeTime - user[_investor].investment[i].DepositTime;

                        }


                    }

                }
          
                depTime=depTime/divider; //1 day

                if(depTime>0)
                {
                    rew  = ((user[_investor].investment[i].investedAmount)*category_percentage[user[_investor].investment[i].category])/100000000000000000000;

                    totalReward += depTime * rew;

                }
            }
            totalReward += user[_investor].TotalReferrals_earning;

            totalReward -= user[_investor].totalWithdraw_reward;


            return totalReward;
        }



        function getReward_perInvestment(uint i) view public returns(uint){ //this function is get the total reward balance of the investor
            uint totalReward;
            uint depTime;
            uint rew;
  
            if(user[msg.sender].investment[i].expire_Time >block.timestamp)
            {
                if(!user[msg.sender].investment[i].unstake)
                {
                    depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                    
                }
                else{

                    depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;

                }
            }
            else{

                if(!user[msg.sender].investment[i].unstake)
                {
                    depTime =user[msg.sender].investment[i].expire_Time - user[msg.sender].investment[i].DepositTime;

                }
                else{
                    if(user[msg.sender].investment[i].unstakeTime > user[msg.sender].investment[i].expire_Time)
                    {
                        depTime =user[msg.sender].investment[i].expire_Time - user[msg.sender].investment[i].DepositTime;

                    }
                    else{

                        depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;

                    }


                }

            }
          
            depTime=depTime/divider; //1 day
            if(depTime>0)
            {
                rew  = ((user[msg.sender].investment[i].investedAmount)*category_percentage[user[msg.sender].investment[i].category])/100000000000000000000;

                totalReward += depTime * rew;

            }
            
            return totalReward;
        }


        function withdrawReward(uint _amount) external returns (bool success){
            // require(_amount>=10000000000000000000,"you can't withdraw less than 8 usdt");         //ensuring that if the investor have rewards to withdraw

            uint Total_reward = getReward(msg.sender);
            require(Total_reward>=_amount,"you dont have rewards to withdrawn");         //ensuring that if the investor have rewards to withdraw
        
            Token(Token_address).transfer(msg.sender,_amount);             // transfering the reward to investor             
            user[msg.sender].totalWithdraw_reward+=_amount;

            return true;

        }



        function getTotalInvestment() public view returns(uint) {   //this function is to get the total investment of the ivestor
            
            return user[msg.sender].totalInvestment;

        }

        function getAllinvestments() public view returns (allInvestments[] memory) { //this function will return the all investments of the investor and withware date
            uint num = user[msg.sender].noOfInvestment;
            uint temp;
            uint currentIndex;
            
            for(uint i=0;i<num;i++)
            {
               if( user[msg.sender].investment[i].investedAmount > 0  ){
                   temp++;
               }

            }
         
            allInvestments[] memory Invested =  new allInvestments[](temp) ;

            for(uint i=0;i<num;i++)
            {
               if( user[msg.sender].investment[i].investedAmount > 0 ){
                 //allInvestments storage currentitem=user[msg.sender].investment[i];
                   Invested[currentIndex]=user[msg.sender].investment[i];
                   currentIndex++;
               }

            }
            return Invested;

        }

        function referralLevel_earning() public view returns( uint[] memory arr1 )
        {
            uint[] memory referralLevels_reward=new uint[](5);
            for(uint i=0;i<5;i++)
            {
                if(user[msg.sender].referralLevel[i].reward>0)
                {
                    referralLevels_reward[i] = user[msg.sender].referralLevel[i].reward;


                }
                else{

                    referralLevels_reward[i] = 0;

                }


            }
            return referralLevels_reward ;


        }



        function referralLevel_count() public view returns( uint[] memory _arr )
        {
            uint[] memory referralLevels_reward=new uint[](5);
            for(uint i=0;i<5;i++)
            {
                if(user[msg.sender].referralLevel[i].reward>0)
                {
                    referralLevels_reward[i] = user[msg.sender].referralLevel[i].count;


                }
                else{
                    referralLevels_reward[i] = 0;

                }


            }
            return referralLevels_reward ;


        }


        function TotalReferrals() public view returns(uint){ // this function is to get the total number of referrals 
            return (user[msg.sender].hisReferrals).length;
        }
        function TotalReferrals_inside(address investor) internal view returns(uint){ // this function is to get the total number of referrals 
            return (user[investor].hisReferrals).length;
        }

        function ReferralsList() public view returns(address[] memory){ //this function is to get the all investors list with there account number
           return user[msg.sender].hisReferrals;
        }

        function get_total_ref_earning() public view returns(uint){ //this function is to get the all investors list with there account number
           return user[msg.sender].TotalReferrals_earning;
        }



  
        function transferOwnership(address _owner) onlyOwner  public
        {
            owner = _owner;
        }

        function total_withdraw_reaward() view public returns(uint){


            uint Temp = user[msg.sender].totalWithdraw_reward;

            return Temp;
            

        }
        function get_currTime() public view returns(uint)
        {
            return block.timestamp;
        }
        function withdrawGlx(uint _amount) onlyOwner  public
        {
            uint bal = Token(Token_address).balanceOf(address(this));
            require(bal>=_amount,"you dont have funds");

            Token(Token_address).transfer(owner,_amount); 
        }
        function withdrawUsdt(uint _amount) onlyOwner public
        {
            uint bal = Token(usdt_address).balanceOf(address(this));
            require(bal>=_amount,"you dont have funds");

            Token(usdt_address).transfer(owner,_amount); 
        }
        function get_Contract_Funds() view public returns(uint) 
        {
            uint bal = Token(Token_address).balanceOf(address(this)); 

            return bal;
        }

        function get_InvExp_Date(uint _num) public view returns(uint)
        {
            return user[msg.sender].investment[_num].expire_Time;
        }
       function cal(uint token) public view returns(uint)
        {
            return ((buying_price * token)/10**18);
        }

        //update values

        function update_sellingPrice(uint _val) onlyOwner public
        {
            selling_price = _val;
        }

        function update_buyingPrice(uint _val) onlyOwner public
        {
            buying_price = _val;
        }


        function update_investmentPeriod(uint _period) onlyOwner external returns(bool){
           require(_period > 0,"value should be greater than 0");
           investmentPeriod=_period * 1 days;
           return true;

        } 

        function update_minInvestment(uint _val) onlyOwner public
        {
            minimum_investment = _val;
        }

        function update_1level_percantage(uint _val) onlyOwner public
        {
            percentage[0] = _val;
        }
                
        function update_2level_percantage(uint _val) onlyOwner public
        {
            percentage[1] = _val;
        }
        
        function update_3level_percantage(uint _val) onlyOwner public
        {
            percentage[2] = _val;
        }
        
        function update_4level_percantage(uint _val) onlyOwner public
        {
            percentage[3] = _val;
        }

        function update_5level_percantage(uint _val) onlyOwner public
        {
            percentage[4] = _val;
        }

        function updateCode(address newCode) onlyOwner public 
        {
            updateCodeAddress(newCode);
        }
    } 
$(document).ready(function(){
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_ban_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "DangKy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrHocvien",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const addressSM ="0x71bEb814288656E75C0C04FA56601Ff5B0fc2369";
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    // tạo contract cho meta mask 
    var contract_MM = new web3.eth.Contract(abi,addressSM);
    console.log(contract_MM);
    // tạo contract cho infura 
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/70bf1b61ea7a42ee91679a2a8709984e");
    var web3_infura = new Web3(provider);
    var contract_Infura = web3_infura.eth.Contract(abi,addressSM);
    console.log(contract_Infura);
    contract_Infura.events.SM_ban_data({filter:{}, fromBlock:"latest"},function(error,event){
        if(error){
            console.log(error);
        }else{
            console.log(event);
            $("#tbDS").append(`
            <tr id="dong1">
                    <td>`+ event.returnValues[0] +`</td>
                    <td>`+ event.returnValues[1] +`</</td>
                 </tr>
                 `);
        }
    });


    checkMM();
    $("#connectMM").click(function(){
        connectMM().then((data)=>{
            currentAccount = data[0];
            console.log(currentAccount);
        }).catch((err)=>{
            console.log(err);
        });
    });
    var currentAccount = "";
    $("#btnDangKy").click(function(){
      
       if(currentAccount.length==0){
           alert("vui long dang nhap meta mask");


       }else{
        $.post("./dangky",{
            Email:$("#txtEmail").val(),
            HoTen:$("#txtHoTen").val(),
            SoDT:$("#txtSoDT").val()
        },
        function(data){
            if(data.ketqua==1){
                contract_MM.methods.DangKy(data.maloi._id).send({
                    from: currentAccount
                });

            }

            });
       }
        
        

    });
});
async function connectMM(){
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    return accounts;
}
function checkMM(){
    if (typeof window.ethereum !=='undefined'){
        console.log('MetaMask is install');

    }else {
        console.log('Chua cai MetaMask')
    }

}
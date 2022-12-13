App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: function() {
        if(window.web3) {
            App.web3Provider=window.web3.currentProvider;
        } else {
            App.web3Provider=new Web3.proviers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {

        $.getJSON('product.json',function(data){

            var productArtifact=data;
            App.contracts.product=TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function() {

        $(document).on('click','.btn-register',App.getData);
    },

    getData:function(event) {
        event.preventDefault();
        var consumerCode = document.getElementById('consumerCode').value;

        var productInstance;
        //window.ethereum.enable();
        web3.eth.getAccounts(function(error,accounts){

            if(error) {
                console.log(error);
            }

            var account=accounts[0];
            // console.log(account);

            App.contracts.product.deployed().then(function(instance){

                productInstance=instance;
                return productInstance.getPurchaseHistory(web3.fromAscii(consumerCode),{from:account});

            }).then(function(result){
                
                var productSNs=[];
                var sellerCodes=[];
                var manufacturerCodes=[];
                // console.log(result);
                
                for(var k=0;k<result[0].length;k++){
                    productSNs[k]=web3.toAscii(result[0][k]);
                }

                for(var k=0;k<result[1].length;k++){
                    sellerCodes[k]=web3.toAscii(result[1][k]);

                }

                for(var k=0;k<result[2].length;k++){
                    manufacturerCodes[k]=web3.toAscii(result[2][k]);
                }
                

                var t= "";
                document.getElementById('logdata').innerHTML = t;
                for(var i=0;i<result[0].length;i++) {
                    var temptr = "<td>"+sellerCodes[i]+"</td>";
                    if(temptr === "<td>0</td>"){
                        break;
                    }
                    var tr="<tr>";
                    tr+="<td>"+productSNs[i]+"</td>";
                    tr+="<td>"+sellerCodes[i]+"</td>";
                    tr+="<td>"+manufacturerCodes[i]+"</td>";
                    tr+="</tr>";
                    t+=tr;

                }
                document.getElementById('logdata').innerHTML += t;
                document.getElementById('add').innerHTML=account;
           }).catch(function(err){
               console.log(err.message);
           })
        })
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    })
})
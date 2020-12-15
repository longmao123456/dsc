//定义修改state状态数据的方法
const mutations={
    addDataList(state){
    //  console.log(data)
    //  console.log(ww)
     state.dataList.push(state.msg)
     state.dataList=[...new Set(state.dataList)]
     localStorage.setItem("dataList",JSON.stringify(state.dataList))
    //  console.log(state.dataList)
    //  data.
    },
    inputChange(state,data){
       state.msg=data
    },
    dataDel(state){
        state.dataList=[];
     localStorage.setItem("dataList",JSON.stringify(state.dataList))

    },
     catId(state,data){
      state.cat_id=data
     },
    changeCategoryRight(state,data){
         state.categoryRightDates=data
     },
     changeAd(state,data){
        state.ad=data
    },
   
    changeloadflag(state,data){
        state.loadflag=data
    },
    changelistflag(state){
        state.listflag=!state.listflag
    },
    changeCategoryList(state,data){
        state.categoryList=data
    },
    changegoodsList(state,data){
        state.goodsList=data
    },
    changecartList(state,data){
        if(data){
            state.cartList.unshift(data);
            localStorage.setItem('cartList', JSON.stringify(state.cartList) )

        }
    },
    addcartList(state,data){
       state.cartList[data.index].value=state.cartList[data.index].value+data.num
       localStorage.setItem('cartList', JSON.stringify(state.cartList))

    },
    changeselect(state,data){
        console.log(data)
        state.cartList[data].isselect=!state.cartList[data].isselect
       localStorage.setItem('cartList', JSON.stringify(state.cartList))

    },
    changeaddress(state,data){
        state.address=data
    },
    changeNum(state,data){
        if(data.a=="+"){
            state.cartList[data.index].value=Number(state.cartList[data.index].value)+1;

        }else if(data.a=="-"){
            if(state.cartList[data.index].value>1){
                state.cartList[data.index].value--;

            }


        }
       localStorage.setItem('cartList', JSON.stringify(state.cartList))

    },
    changeselectall(state,data){
        state.cartList.map(item=>{
            item.isselect=data
        })
    },
    delcartList(state,data){
     state.cartList.splice(data,1)
     localStorage.setItem('cartList', JSON.stringify(state.cartList))


    },
    usertokenchange(state,data){
        localStorage.setItem("usertoken",JSON.stringify(data))
        state.usertoken=data
    }
    
}
export default mutations
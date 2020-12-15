import { getCategoryLeft,getCategoryRight ,getCategoryList,getgoodsList} from "../api/api"

//定义提交mutations中方法的方法
const actions={
//     async loadList(context,cat_id){
//    let result =await 
async actChangeCategoryLeft(context){
    let result=await getCategoryLeft()
    console.log(result);
    context.commit("changeCategoryLeft",result.data)
    // console.log(result);

},
    async actChangeCategoryRight(context,cat_id){
        context.commit("changeloadflag",true)
        let result=await getCategoryRight(cat_id)
        // console.log(result.data);
        let resultLeft= await getCategoryLeft()
        console.log(resultLeft.data)
        resultLeft.data.forEach(item=>{
            if(item.cat_id==cat_id){
                // console.log(item.touch_catads)
                context.commit("changeAd",item.touch_catads)
                context.commit("changeloadflag",false)
                context.commit("catId", cat_id)
            }
        })
        // console.log(context.state.ad) 
        context.commit("changeCategoryRight",result.data)
    },
    async actChangeCategoryList(context,data){
        console.log(data.url)
        let result=await getCategoryList(data.url,data.params,data.type)
        console.log(result);
        context.commit("changeCategoryList",   result.data)
        // console.log(result);
    
    },
    async actChangeCategoryListadd(context,data){
        console.log(data.url)
        let result=await getCategoryList(data.url,data.params,data.type)
        console.log(result);
        context.commit("changeCategoryList", context.state.categoryList.concat(result.data))
        // console.log(result);
    
    },
    async actchangegoodsList(context,data){  //商品详情
        // console.log(data.url)
        let result=await getgoodsList(data.url,data.params,data.type)
        // console.log(result);
        context.commit("changegoodsList", result.data)
        // console.log(context.state.goodsList);
    
    },

}
export default actions

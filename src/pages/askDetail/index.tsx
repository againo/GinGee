import './index.scss'
import GoodsDetail from "../../components/GoodsDetail";
import {detailFormData} from "../../tools/templateData";
// import default 的情况，可自定命名


export default function Index() {


    // 展示页面需要钩子吗？




    return (
        //为什么加一个div就出问题？
          <GoodsDetail formData={detailFormData} />
    )
}

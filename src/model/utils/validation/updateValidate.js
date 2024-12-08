//更新された内容、または入力が空でないもののみリクエストに含める

export const updateValidate=(originaldata,updatedata)=>{
    //リクエスト用のオブジェクトを作成
    const newObject = {}
    //更新後のデータをチェックし、必要なもののみオブジェクトに含める
    //updatedata
    // {
    //     username:"...",
    //     password:"...",
    //     bio:"..."
    // }
    //updatedataが空、もしくはoriginaldata内の同名フィールドと同じ値なら含めない

    Object.keys(updatedata).forEach((key) => {
        // 条件: 値が異なる、かつ空でもnullでもない場合
        if (
          updatedata[key] !== originaldata[key] &&
          updatedata[key] !== "" &&
          updatedata[key] !== null &&
          updatedata[key] !== undefined
        ) {
          newObject[key] = updatedata[key];
        }
      });

    if(Object.keys(newObject).length === 0){
        return null;
    }

    return newObject
}
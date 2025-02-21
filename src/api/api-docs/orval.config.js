module.exports= {
    petstore: {
      input: "./openapi-merged.yaml", 
      output: {
        target: "./src/api/generated/", 
        client: "axios", // Axios ベースの API クライアントを生成
        mock: true, // モックデータを生成しない場合は `false`
      },
    },
  };
  
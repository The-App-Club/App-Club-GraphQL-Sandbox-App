import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// GraphQLスキーマ言語を記述してスキーマを構築する
// スキーマはあくまで定義のみで実際のデータ操作は行わない
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// ルートは、APIエンドポイントごとにリゾルバ関数を提供します
// リゾルバとは特定のフィールドのデータを返す関数（メソッド）であり、実際のデータ操作を行う部分
const root = {
  hello: () => {
    return "Hello world!";
  },
};

// Expressでサーバーを立てます
// graphiql: true としたので、GraphQLを利用できる
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

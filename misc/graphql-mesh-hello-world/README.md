## Reference

- [graphql-mesh](https://www.graphql-mesh.com/)
- [creating-data-graph-graphql-mesh-hasura-remote-joins](https://hasura.io/blog/creating-data-graph-graphql-mesh-hasura-remote-joins/)
- [build-mesh-artifacts](https://www.graphql-mesh.com/docs/recipes/build-mesh-artifacts)

## Usage

*mesh dev*以外はまだ動作不安定

```bash
$ npx mesh --help
mesh [コマンド]

コマンド:
  mesh serve     `serve` command has been replaced by `dev` and `start`
                 commands. Check our documentation for new usage
  mesh dev       Serves a GraphQL server with GraphQL interface by building Mesh
                 artifacts on the fly
  mesh start     Serves a GraphQL server with GraphQL interface based on your
                 generated Mesh artifacts
  mesh validate  Validates artifacts
  mesh build     Builds artifacts

オプション:
      --version  バージョンを表示                                         [真偽]
      --help     ヘルプを表示                                             [真偽]
  -r, --require  Loads specific require.extensions before running the codegen
                 and reading the configuration           [配列] [デフォルト: []]
      --dir      Modified the base directory to use for looking for meshrc
                 config file
     [文字列] [デフォルト: "/home/gri-user/wrksp/graphql-mesh/examples/hello-world"]
```

## Serve

```bash
$ yarn dev
yarn run v1.22.17
warning package.json: No license field
$ mesh dev
(node:13530) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
🕸️ - Server : Generating Mesh schema...
🕸️ - Server : Serving GraphQL Mesh: http://localhost:4000
```

## Client

サーブ後、エンドポイントに /graphqlを追加して以下のコマンドを実行

```bash
$ time node client.js | jq
{
  "data": {
    "greeting": "Hello World"
  }
}

real    0m0.160s
user    0m0.252s
sys     0m0.036s
```
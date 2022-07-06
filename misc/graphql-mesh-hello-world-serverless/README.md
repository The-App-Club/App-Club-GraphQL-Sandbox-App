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

サーブ後、エンドポイントに /graphql を追加して以下のコマンドを実行

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

## Build

```bash
$ yarn build
yarn run v1.22.17
warning package.json: No license field
$ mesh build
(node:17645) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
🕸️ : Cleaning existing artifacts
🕸️ : Reading Mesh configuration
🕸️ : Generating Mesh schema
🕸️ : Generating artifacts
🕸️ : Generating index file in TypeScript
🕸️ : Writing index.ts for ESM to the disk.
🕸️ : Compiling TS file as ES Module to `index.mjs`
🕸️ : Writing index.ts for CJS to the disk.
🕸️ : Compiling TS file as CommonJS Module to `index.js`
🕸️ : Deleting index.ts
🕸️ : Cleanup
🕸️ : Done! => /home/gri-user/gri-wrksp/App-Club-GraphQL-Handle-App/misc/graphql-mesh-hello-world-serverless/.mesh
Done in 14.07s.
```

## Deploy

結構重い

```bash
$ time serverless deploy --aws-profile app-club-serverless
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Ensuring that deployment bucket exists
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service graphqlMeshHelloWorldServerless.zip file to S3 (39.57 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Service Information
service: graphqlMeshHelloWorldServerless
stage: dev
region: ap-northeast-1
stack: graphqlMeshHelloWorldServerless-dev
resources: 11
api keys:
  None
endpoints:
  POST - https://nhbslaktc9.execute-api.ap-northeast-1.amazonaws.com/dev/cool
functions:
  app: graphqlMeshHelloWorldServerless-dev-app
layers:
  None
Serverless: Deprecation warning: Resolution of lambda version hashes was improved with better algorithm, which will be used in next major release.
            Switch to it now by setting "provider.lambdaHashingVersion" to "20201221".
            While it is highly encouraged to upgrade to new algorithm, you can still use the old approach by setting "provider.lambdaHashingVersion" to "20200924".
            More Info: https://www.serverless.com/framework/docs/deprecations/#LAMBDA_HASHING_VERSION_V2

Monitor APIs by route with the Serverless Dashboard: run "serverless"

real    1m22.010s
user    0m37.314s
sys     0m15.988s
```

## Check After Deploy

```bash
$ curl -X POST  'https://nhbslaktc9.execute-api.ap-northeast-1.amazonaws.com/dev/cool' -d '{ greeting }' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    38  100    26  100    12    192     88 --:--:-- --:--:-- --:--:--   281
{
  "greeting": "Hello World"
}
```

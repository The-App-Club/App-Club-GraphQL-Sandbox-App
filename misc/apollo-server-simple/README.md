[apollo-server serverless](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)




## Deploy

```bash
$ time serverless deploy --aws-profile app-club-serverless
```

## Check After Deploy

### Pattern1

```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://nw0sl6joc5.execute-api.ap-northeast-1.amazonaws.com/dev/' \
  --data '{"query":"{ hello }"}'
```

### Pattern2

```bash
$ curl -X POST -H 'Content-Type: application/json' 'https://nw0sl6joc5.execute-api.ap-northeast-1.amazonaws.com/dev/' -d '{"query": "{hello}"}'
{"data":{"hello":"Hello world!"}}
```

### Pattern3

```bash
$ curl -X POST -H 'Content-Type: application/json' 'https://nw0sl6joc5.execute-api.ap-northeast-1.amazonaws.com/dev/' -d '@a.graphql'
{"data":{"hello":"Hello world!"}}
```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.HelloWorldDocument = exports.getMeshSDK = exports.getBuiltMesh = exports.documentsInSDL = exports.getMeshOptions = exports.rawConfig = void 0;
const tslib_1 = require("tslib");
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const path_1 = require("path");
const cache_inmemory_lru_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const json_schema_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/json-schema"));
const transform_mock_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-mock"));
const merger_bare_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const jsonSchema_json_cjs_1 = (0, tslib_1.__importDefault)(require("./sources/Hello World/jsonSchema.json.cjs"));
const importedModules = {
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: cache_inmemory_lru_1.default,
    // @ts-ignore
    ["@graphql-mesh/json-schema"]: json_schema_1.default,
    // @ts-ignore
    ["@graphql-mesh/transform-mock"]: transform_mock_1.default,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: merger_bare_1.default,
    // @ts-ignore
    [".mesh/sources/Hello World/jsonSchema.json.cjs"]: jsonSchema_json_cjs_1.default
};
const baseDir = (0, path_1.join)(__dirname, '..');
const importFn = (moduleId) => {
    const relativeModuleId = ((0, path_1.isAbsolute)(moduleId) ? (0, path_1.relative)(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return Promise.resolve(importedModules[relativeModuleId]);
};
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
const cache_inmemory_lru_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const utils_1 = require("@graphql-mesh/utils");
const utils_2 = require("@graphql-mesh/utils");
const json_schema_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/json-schema"));
const transform_mock_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-mock"));
const merger_bare_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const utils_3 = require("@graphql-mesh/utils");
exports.rawConfig = { "sources": [{ "name": "Hello World", "handler": { "jsonSchema": { "operations": [{ "type": "Query", "field": "greeting", "method": "GET", "responseSample": "greeting.json" }] } } }], "transforms": [{ "mock": { "mocks": [{ "apply": "Query.greeting" }] } }], "documents": ["query HelloWorld {\n  greeting\n}\n"] };
async function getMeshOptions() {
    const cache = new cache_inmemory_lru_2.default({
        ...(exports.rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const pubsub = new utils_1.PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_2.DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const helloWorldTransforms = [];
    const additionalTypeDefs = [];
    const helloWorldHandler = new json_schema_2.default({
        name: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].handler["jsonSchema"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[0].name),
        logger: logger.child(exports.rawConfig.sources[0].name),
        importFn
    });
    sources.push({
        name: 'Hello World',
        handler: helloWorldHandler,
        transforms: helloWorldTransforms
    });
    transforms.push(new transform_mock_2.default({
        apiName: '',
        config: exports.rawConfig.transforms[0]["mock"],
        baseDir,
        cache,
        pubsub,
        importFn
    }));
    const merger = new merger_bare_2.default({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    const additionalResolversRawConfig = [];
    const additionalResolvers = await (0, utils_3.resolveAdditionalResolvers)(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = exports.rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
exports.getMeshOptions = getMeshOptions;
exports.documentsInSDL = [/* GraphQL */ `query HelloWorld {
  greeting
}`];
async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return (0, runtime_1.getMesh)(meshConfig);
}
exports.getBuiltMesh = getBuiltMesh;
async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
exports.getMeshSDK = getMeshSDK;
exports.HelloWorldDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "HelloWorld" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "greeting" } }] } }] };
function getSdk(requester) {
    return {
        HelloWorld(variables, options) {
            return requester(exports.HelloWorldDocument, variables, options);
        }
    };
}
exports.getSdk = getSdk;

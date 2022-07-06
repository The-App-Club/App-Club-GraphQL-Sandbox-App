import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { join, relative, isAbsolute, dirname } from 'path';
import { fileURLToPath } from 'url';
import ExternalModule_0 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_1 from '@graphql-mesh/json-schema';
import ExternalModule_2 from '@graphql-mesh/transform-mock';
import ExternalModule_3 from '@graphql-mesh/merger-bare';
import ExternalModule_4 from './sources/Hello World/jsonSchema.json.cjs';
const importedModules = {
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_0,
    // @ts-ignore
    ["@graphql-mesh/json-schema"]: ExternalModule_1,
    // @ts-ignore
    ["@graphql-mesh/transform-mock"]: ExternalModule_2,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: ExternalModule_3,
    // @ts-ignore
    [".mesh/sources/Hello World/jsonSchema.json.cjs"]: ExternalModule_4
};
const baseDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const importFn = (moduleId) => {
    const relativeModuleId = (isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return Promise.resolve(importedModules[relativeModuleId]);
};
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import JsonSchemaHandler from '@graphql-mesh/json-schema';
import MockTransform from '@graphql-mesh/transform-mock';
import BareMerger from '@graphql-mesh/merger-bare';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
export const rawConfig = { "sources": [{ "name": "Hello World", "handler": { "jsonSchema": { "operations": [{ "type": "Query", "field": "greeting", "method": "GET", "responseSample": "greeting.json" }] } } }], "transforms": [{ "mock": { "mocks": [{ "apply": "Query.greeting" }] } }], "documents": ["query HelloWorld {\n  greeting\n}\n"] };
export async function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const pubsub = new PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const helloWorldTransforms = [];
    const additionalTypeDefs = [];
    const helloWorldHandler = new JsonSchemaHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler["jsonSchema"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    sources.push({
        name: 'Hello World',
        handler: helloWorldHandler,
        transforms: helloWorldTransforms
    });
    transforms.push(new MockTransform({
        apiName: '',
        config: rawConfig.transforms[0]["mock"],
        baseDir,
        cache,
        pubsub,
        importFn
    }));
    const merger = new BareMerger({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    const additionalResolversRawConfig = [];
    const additionalResolvers = await resolveAdditionalResolvers(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
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
export const documentsInSDL = /*#__PURE__*/ [/* GraphQL */ `query HelloWorld {
  greeting
}`];
export async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
export const HelloWorldDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "HelloWorld" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "greeting" } }] } }] };
export function getSdk(requester) {
    return {
        HelloWorld(variables, options) {
            return requester(HelloWorldDocument, variables, options);
        }
    };
}

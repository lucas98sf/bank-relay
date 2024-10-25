/**
 * @generated SignedSource<<7b45f17e1787e91922b2f48a1bbaa174>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type layoutLogoutMutation$variables = Record<PropertyKey, never>;
export type layoutLogoutMutation$data = {
  readonly logout: boolean | null | undefined;
};
export type layoutLogoutMutation = {
  response: layoutLogoutMutation$data;
  variables: layoutLogoutMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "logout",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "layoutLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "layoutLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a344ae903343b177b07e213dd79fd8bc",
    "id": null,
    "metadata": {},
    "name": "layoutLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation layoutLogoutMutation {\n  logout\n}\n"
  }
};
})();

(node as any).hash = "e4aa7ec25a7711d2b125944ec15ab074";

export default node;

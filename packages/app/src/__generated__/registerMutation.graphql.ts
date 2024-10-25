/**
 * @generated SignedSource<<96c2cbe1cffa176c3b1c2d88ffa6b3fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type registerMutation$variables = {
  email: string;
  password: string;
};
export type registerMutation$data = {
  readonly register: {
    readonly __typename?: string;
    readonly data?: boolean;
    readonly error?: string | null | undefined;
  } | null | undefined;
};
export type registerMutation = {
  response: registerMutation$data;
  variables: registerMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  },
  {
    "kind": "Variable",
    "name": "password",
    "variableName": "password"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "data",
      "storageKey": null
    }
  ],
  "type": "MutationRegisterSuccess",
  "abstractKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "error",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = [
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "registerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "register",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": (v5/*: any*/),
            "type": "ZodError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v5/*: any*/),
            "type": "Error",
            "abstractKey": "__isError"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "registerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "register",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": (v6/*: any*/),
            "type": "ZodError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v6/*: any*/),
            "type": "Error",
            "abstractKey": "__isError"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b8d7d79e06919ce1d98eeb9ea04aab94",
    "id": null,
    "metadata": {},
    "name": "registerMutation",
    "operationKind": "mutation",
    "text": "mutation registerMutation(\n  $email: String!\n  $password: String!\n) {\n  register(email: $email, password: $password) {\n    __typename\n    ... on MutationRegisterSuccess {\n      data\n    }\n    ... on ZodError {\n      __typename\n      error\n    }\n    ... on Error {\n      __isError: __typename\n      __typename\n      error\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b28817486dc89754bc2d5482b513d418";

export default node;

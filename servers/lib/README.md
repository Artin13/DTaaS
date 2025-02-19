# Overview

This **lib microservice** takes a query from the user that asks for content within a given specified directory. This microservices handles request by fetching and returning the file-names and folders within that respective directory. This microservice provides gitlab graphql compliant API.

## Gitlab setup

For this microserivce to be functional, a certain directory or gitlab project structure is expected. The microservice expects that the gitlab consisting of one group, DTaaS, and within that group, all of the projects be located, **user1**, **user2**, ... , as well as a **commons** project. A sample file structure can be seen in `files/` directory.

On how to create groups, visit the [gitlab documentation](https://docs.gitlab.com/ee/user/group/)

## Configuration setup

In order to create this environment, you need to create a `.env` file, wherein you create the following environment variables,
and insert with the correct-information relevant for your setup:

```
PORT='4001'
MODE='local' or 'gitlab'
LOCAL_PATH ='/Users/<Username>/DTaaS/files'
GITLAB_GROUP ='dtaas'
GITLAB_URL='https://gitlab.com/api/graphql'
TOKEN='123-sample-token'
LOG_LEVEL='debug'
TEST_PATH='/Users/<Username>/DTaaS/servers/lib/test/data/test_assets'
APOLLO_PATH='/lib' or ''
GRAPHQL_PLAYGROUND='false' or 'true'

```

The `TOKEN` should be set to your GitLab Group access API token. For more information on how to create and use your access token, visit:
https://docs.gitlab.com/ee/user/group/settings/group_access_tokens.html

Once you've generated a token, copy it and replace the value of `TOKEN` with your token for the gitlab group, can be found.

## Developer Commands

```bash
cd server/lib
yarn install    # Install dependencies for the microservice
yarn syntax     # analyzes source code for potential errors, style violations, and other issues,
yarn build      # compile ES6 files into ES5 javascript files and copy all JS files into build/ directory
yarn test -a      # run all tests
yarn test -e      # run end-to-end tests
yarn test -i      # run integration tests
yarn test -u      # run unit tests
yarn start      # start the application
yarn clean      # deletes directories "build", "coverage", and "dist"
```

## Service Endpoint

The URL endpoint for this microservice is located at: `localhost:PORT/lib`

### Lib request and response

Documentation of the lib query and responses.

The provided HTTP request is a POST request sent to the endpoint http://foo.com:<PORT>/lib. It contains a JSON payload in the body. The request includes headers such as Content-Type, User-Agent, and Accept.

The request is using a POST method because it is sending a GraphQL query. GraphQL queries are usually sent as POST requests because they can be complex and include a JSON payload, allowing for more flexibility in the query structure and variables

```

HTTP Request:

.....

send the request to: http://foo.com:<PORT>/lib

 

POST /lib

Host: foo.com:<PORT>

Content-Type:application/json

User-Agent:Mozilla

Accept:*/*

 

{

"query": "{ getFiles(path: \"common\")}"

}

 

HTTP Response:

.....

200 OK

access-control-allow-origin: *

connection: keep-alive

content-length: 76

content-type: application/json; charset=utf-8

date: Mon, 15 May 2023 10:13:37 GMT

etag: ................

keep-alive: timeout=5

x-powered-by: Express

 

{'data':{'getFiles':['data','digital twins','functions','models','tools']}}

```

### GraphQL API queries

The only accepted query is:

```graphql
query directoryList($path: String!, $domain: ID!) {
  project(fullPath: $domain) {
    webUrl
    path
    repository {
      paginatedTree(path: $path, recursive: false) {
        nodes {
          trees {
            nodes {
              name
            }
          }
        }
      }
      diskPath
    }
  }
}
```

The _path_ refers to the file path to look at: For example, _user1_ looks at files of **user1**; _user1/functions_ looks at contents of _functions/_ directory.

The _$domain_ refers to gitlab project to lookup. This information is ignored by the microservice. Instead, the microservice takes the _$domain_ variable value from `.env` file.

# Choose Backend

## Status

<!-- What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.? -->
accepted

## Context

<!-- What is the issue that we're seeing that is motivating this decision or change? -->
The need for a server component which delivers images and their metadata (described in https://github.com/mi-classroom/mi-master-wt-beiboot-2021/issues/1).
### Options
- Node.js
- Deno
- PHP

## Decision

<!-- What is the change that we're proposing and/or doing? -->
The use of node.js.

## Consequences

<!-- What becomes easier or more difficult to do because of this change? -->
Node.js is a common JavaScript runtime environment with many open source modules that can be used. Further developers might be familiar with node.js.
# Simutrans makeobj wrapper

A makeobj wrapper for Simutrans.

## Install

```
npm i simutrans-makeobj-wrapper
```

## Usage

```
import { Makeobj } from 'simutrans-makeobj-wrapper';

const makeobj = new Makeobj('path/to/makeobj');
const result = makeobj.pak(128, 'path/to/output.pak', 'path/to/example.dat');

if (result.isSuccess) {
  console.log(result.stdout);
} else {
  console.error(result.stderr);
}
```

## Available methods

- pak
- capabilities
- list
- dump
- merge
- extract
- expand
  Requires makeobj 60.5 or higher

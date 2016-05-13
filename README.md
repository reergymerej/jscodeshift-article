# Codemods with jscodeshift<br><small>Writing Code to Rewrite Your Code</small>

**Exercise 1 - Remove Consoles**
```sh
jscodeshift -t remove-consoles.js remove-consoles.input.js -d -p
```
**Exercise 2 - Deprecated Method Calls**
```sh
jscodeshift -t ./deprecated.js ./deprecated.input.js -d -p
```

**Exercise 3 - Signature Change**
```sh
jscodeshift -t signature-change.js signature-change.input.js -d -p
```

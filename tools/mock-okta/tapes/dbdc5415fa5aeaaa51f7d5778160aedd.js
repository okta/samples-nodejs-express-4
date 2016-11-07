var path = require("path");

/**
 * GET /assets/js/mvc/vendor/lib/underscore-wrapper.js
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: * / *
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI0jRgRLD_uQBqSzCUCxXy5OA; t=default; JSESSIONID=C8CAB112A54DECAB36F64A605FA44B2A
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("accept-ranges", "bytes");
  res.setHeader("etag", "W/\"775-1477769062000\"");
  res.setHeader("last-modified", "Sat, 29 Oct 2016 19:24:22 GMT");
  res.setHeader("content-type", "text/javascript");
  res.setHeader("content-length", "775");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:48 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ZGVmaW5lKFsndW5kZXJzY29yZScsICdoYW5kbGViYXJzJ10sIGZ1bmN0aW9uICh1bmRlcnNjb3JlLCBIYW5kbGViYXJzKSB7CgogIHZhciBfID0gdW5kZXJzY29yZS5ub0NvbmZsaWN0KCk7CgogIF8ubWl4aW4oewoKICAgIHJlc3VsdEN0eDogZnVuY3Rpb24gKG9iamVjdCwgcHJvcGVydHksIGNvbnRleHQsIGRlZmF1bHRWYWx1ZSkgewogICAgICB2YXIgdmFsdWUgPSBfLmlzT2JqZWN0KG9iamVjdCkgPyBvYmplY3RbcHJvcGVydHldIDogdm9pZCAwOwogICAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSkgewogICAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0IHx8IG9iamVjdCk7CiAgICAgIH0KICAgICAgaWYgKHZhbHVlKSB7CiAgICAgICAgcmV0dXJuIHZhbHVlOwogICAgICB9CiAgICAgIGVsc2UgewogICAgICAgIHJldHVybiAhXy5pc1VuZGVmaW5lZChkZWZhdWx0VmFsdWUpID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7CiAgICAgIH0KICAgIH0sCgogICAgaXNJbnRlZ2VyOiBmdW5jdGlvbiAoeCkgewogICAgICByZXR1cm4gXy5pc051bWJlcih4KSAmJiAoeCAlIDEgPT09IDApOwogICAgfSwKCiAgICB0ZW1wbGF0ZTogZnVuY3Rpb24gKHNvdXJjZSwgZGF0YSkgewogICAgICB2YXIgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoc291cmNlKTsKICAgICAgcmV0dXJuIGRhdGEgPyB0ZW1wbGF0ZShkYXRhKSA6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiB0ZW1wbGF0ZShkYXRhKTsgfTsKICAgIH0KCiAgfSk7CgogIHJldHVybiBfOwoKfSk7Cg==", "base64"));
  res.end();

  return __filename;
};

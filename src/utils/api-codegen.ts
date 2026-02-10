/**
 * API Code Generation Utilities
 * Generates request code snippets in multiple languages from API endpoint metadata.
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface CodeGenOptions {
  method: HttpMethod;
  path: string;
  baseUrl: string;
  headers?: Record<string, string>;
  body?: string;
}

export function generateCurl(opts: CodeGenOptions): string {
  const { method, path, baseUrl, headers = {}, body } = opts;
  const url = baseUrl + path;
  let code = `curl -X ${method} "${url}"`;
  for (const [k, v] of Object.entries(headers)) {
    code += ` \\\n  -H "${k}: ${v}"`;
  }
  if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
    code += ` \\\n  -d '${body}'`;
  }
  return code;
}

export function generateJavaScript(opts: CodeGenOptions): string {
  const { method, path, baseUrl, headers = {}, body } = opts;
  const url = baseUrl + path;
  const hasBody = body && ['POST', 'PUT', 'PATCH'].includes(method);
  return `const response = await fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 4)},${hasBody ? `\n  body: JSON.stringify(${body}),` : ''}
});

const data = await response.json();
console.log(data);`;
}

export function generatePython(opts: CodeGenOptions): string {
  const { method, path, baseUrl, headers = {}, body } = opts;
  const url = baseUrl + path;
  const hasBody = body && ['POST', 'PUT', 'PATCH'].includes(method);
  const headersStr = JSON.stringify(headers).replace(/"/g, "'");
  return `import requests

response = requests.${method.toLowerCase()}(
    "${url}",
    headers=${headersStr},${hasBody ? `\n    json=${body},` : ''}
)

print(response.json())`;
}

export function generateGo(opts: CodeGenOptions): string {
  const { method, path, baseUrl, headers = {}, body } = opts;
  const url = baseUrl + path;
  const hasBody = body && ['POST', 'PUT', 'PATCH'].includes(method);
  const headerLines = Object.entries(headers)
    .map(([k, v]) => `    req.Header.Set("${k}", "${v}")`)
    .join('\n');

  if (hasBody) {
    return `package main

import (
    "fmt"
    "net/http"
    "io"
    "strings"
)

func main() {
    body := strings.NewReader(\`${body}\`)
    req, _ := http.NewRequest("${method}", "${url}", body)
${headerLines}

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()

    respBody, _ := io.ReadAll(resp.Body)
    fmt.Println(string(respBody))
}`;
  }

  return `package main

import (
    "fmt"
    "net/http"
    "io"
)

func main() {
    req, _ := http.NewRequest("${method}", "${url}", nil)
${headerLines}

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`;
}

export function generateCode(lang: string, opts: CodeGenOptions): string {
  switch (lang) {
    case 'curl': return generateCurl(opts);
    case 'javascript': return generateJavaScript(opts);
    case 'python': return generatePython(opts);
    case 'go': return generateGo(opts);
    default: return generateCurl(opts);
  }
}

const a=(s,r="/account")=>{const t=String(s||"");return t.startsWith("/")&&!t.startsWith("//")&&!t.startsWith("/\\")?t:r};export{a as s};

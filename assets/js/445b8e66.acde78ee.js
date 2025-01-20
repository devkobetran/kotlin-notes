"use strict";(self.webpackChunkelasticstack_notes=self.webpackChunkelasticstack_notes||[]).push([[831],{4239:(n,l,e)=>{e.r(l),e.d(l,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var i=e(4848),t=e(8453);const s={sidebar_position:2},r="Nullability & Functional Programming",o={id:"tutorial/nullability-functional-programming",title:"Nullability & Functional Programming",description:"Nullable types",source:"@site/docs/tutorial/nullability-functional-programming.md",sourceDirName:"tutorial",slug:"/tutorial/nullability-functional-programming",permalink:"/kotlin-notes/docs/tutorial/nullability-functional-programming",draft:!1,unlisted:!1,editUrl:"https://github.com/devkobetran/kotlin-notes/docs/tutorial/nullability-functional-programming.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Starting up with Kotlin",permalink:"/kotlin-notes/docs/tutorial/starting-up-with-kotlin"},next:{title:"Properties, OOP, Conventions",permalink:"/kotlin-notes/docs/tutorial/properties-oop-conventions"}},a={},c=[{value:"Nullable types",id:"nullable-types",level:2},{value:"Dealing with Nullable Types",id:"dealing-with-nullable-types",level:3},{value:"Nullability operators",id:"nullability-operators",level:3},{value:"Making Null Pointer Exception Explicit",id:"making-null-pointer-exception-explicit",level:3},{value:"Nullable types under the hood",id:"nullable-types-under-the-hood",level:2}];function u(n){const l={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.header,{children:(0,i.jsx)(l.h1,{id:"nullability--functional-programming",children:"Nullability & Functional Programming"})}),"\n",(0,i.jsx)(l.h2,{id:"nullable-types",children:"Nullable types"}),"\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsx)(l.li,{children:"Make exceptions occur at compile time, rather than runtime."}),"\n"]}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:'// String only\nval s1: String = "always not null"\n\n// Allows String or null\nval s2: String? = null\n'})}),"\n",(0,i.jsx)(l.h3,{id:"dealing-with-nullable-types",children:"Dealing with Nullable Types"}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:"val s: String?\n\nif(s != null){\n    s.length\n}\n"})}),"\n",(0,i.jsx)(l.p,{children:"is equivalent to"}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:"val s: String?\n\ns?.length\n"})}),"\n",(0,i.jsx)(l.h3,{id:"nullability-operators",children:"Nullability operators"}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:"// if s!= null, then return s.length\n// else return null\nval length: Int? = s?.length\n"})}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:"// if s!= null, then return s.length\n// else return 0\nval length: Int = s?.length ?: 0\n"})}),"\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsx)(l.li,{children:"What will be printed?"}),"\n"]}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:'val a: Int? = null\nval b: Int? = 1\nval c: Int = 2\n\nval s1 = (a ?: 0) + c\nval s2 = (b ?: 0) + c\nprint("$s1$s2")\n'})}),"\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsxs)(l.li,{children:["Answer: ",(0,i.jsx)(l.code,{children:"23"})]}),"\n"]}),"\n",(0,i.jsx)(l.h3,{id:"making-null-pointer-exception-explicit",children:"Making Null Pointer Exception Explicit"}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:"val s: String?\n\ns!!\n"})}),"\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsxs)(l.li,{children:["This basically means:","\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsxs)(l.li,{children:["If ",(0,i.jsx)(l.code,{children:"s"})," is not null, give ",(0,i.jsx)(l.code,{children:"s"})]}),"\n",(0,i.jsxs)(l.li,{children:["Else if ",(0,i.jsx)(l.code,{children:"s"})," is null, then give a Null Pointer Exception."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(l.admonition,{type:"tip",children:(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsx)(l.li,{children:"Don't use Null Pointer Exception excessively."}),"\n",(0,i.jsx)(l.li,{children:"Don't use two NPEs within the same line. Otherwise, you won't know which one thrown the exception."}),"\n"]})}),"\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsx)(l.li,{children:"Which line(s) won't compile?"}),"\n"]}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:'#1 fun isFoo1(n: Name) = n.value == "foo"\n#2 fun isFoo2(n: Name?) = n.value == "foo"\n#3 fun isFoo3(n: Name?) = n != null && n.value == "foo"\n#4 fun isFoo4(n: Name?) = n?.value == "foo"\n\n   fun main(args: Array<String>) {\n#5   isFoo1(null)\n#6   isFoo2(null)\n#7   isFoo3(null)\n#8   isFoo4(null)\n   }\n'})}),"\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsx)(l.li,{children:"Answer: #2 and #5"}),"\n",(0,i.jsx)(l.li,{children:"What will be printed?"}),"\n"]}),"\n",(0,i.jsx)(l.pre,{children:(0,i.jsx)(l.code,{className:"language-ts",children:"val x: Int? = 1\nval y: Int = 2\nval sum = x ?: 0 + y\nprintln(sum)\n"})}),"\n",(0,i.jsxs)(l.ul,{children:["\n",(0,i.jsxs)(l.li,{children:["Answer: ",(0,i.jsx)(l.code,{children:"1"})]}),"\n"]}),"\n",(0,i.jsx)(l.h2,{id:"nullable-types-under-the-hood",children:"Nullable types under the hood"})]})}function d(n={}){const{wrapper:l}={...(0,t.R)(),...n.components};return l?(0,i.jsx)(l,{...n,children:(0,i.jsx)(u,{...n})}):u(n)}},8453:(n,l,e)=>{e.d(l,{R:()=>r,x:()=>o});var i=e(6540);const t={},s=i.createContext(t);function r(n){const l=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(l):{...l,...n}}),[l,n])}function o(n){let l;return l=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:r(n.components),i.createElement(s.Provider,{value:l},n.children)}}}]);
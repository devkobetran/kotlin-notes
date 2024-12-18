---
sidebar_position: 2
---

# Nullability & Functional Programming

## Nullable types

- Make exceptions occur at compile time, rather than runtime.

```ts
// String only
val s1: String = "always not null"

// Allows String or null
val s2: String? = null
```

### Dealing with Nullable Types

```ts
val s: String?

if(s != null){
    s.length
}
```

is equivalent to

```ts
val s: String?

s?.length
```

### Nullability operators

```ts
// if s!= null, then return s.length
// else return null
val length: Int? = s?.length
```

```ts
// if s!= null, then return s.length
// else return 0
val length: Int = s?.length ?: 0
```

- What will be printed?

```ts
val a: Int? = null
val b: Int? = 1
val c: Int = 2

val s1 = (a ?: 0) + c
val s2 = (b ?: 0) + c
print("$s1$s2")
```

- Answer: `23`

### Making Null Pointer Exception Explicit

```ts
val s: String?

s!!
```

- This basically means:
  - If `s` is not null, give `s`
  - Else if `s` is null, then give a Null Pointer Exception.

:::tip

- Don't use Null Pointer Exception excessively.
- Don't use two NPEs within the same line. Otherwise, you won't know which one thrown the exception.

:::

- Which line(s) won't compile?

```ts
#1 fun isFoo1(n: Name) = n.value == "foo"
#2 fun isFoo2(n: Name?) = n.value == "foo"
#3 fun isFoo3(n: Name?) = n != null && n.value == "foo"
#4 fun isFoo4(n: Name?) = n?.value == "foo"

   fun main(args: Array<String>) {
#5   isFoo1(null)
#6   isFoo2(null)
#7   isFoo3(null)
#8   isFoo4(null)
   }
```

- Answer: #2 and #5
- What will be printed?

```ts
val x: Int? = 1
val y: Int = 2
val sum = x ?: 0 + y
println(sum)
```

- Answer: `1`

## Nullable types under the hood

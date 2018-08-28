# Strictly Formed Io-TS

io-ts wrapper for [strictly-formed](https://github.com/sayari-analytics/strictly-formed), a statically typed form library for typescript.  Guarantee runtime type safety for custom static types.


# API

<!-- Form `value` props are typechecked according to their relevant types, as are the arguments passed to their handler callbacks.  In addition, where relevant, optional `onSubmit` and `onClear` handlers are bound to their respective `enter` and `esc` keys. -->
Validate form input against [io-ts](https://github.com/gcanti/io-ts) runtime types, wrapping input changes in a [fp-ts](https://github.com/gcanti/fp-ts) `Either<Error, T>` type.


**StringInput**
```typescript
type Props = {
  type: t.Type<T>,
  value: string | undefined
  className?: string
  placeholder?: string
  forwardedRef?: Ref<HTMLInputElement>
  onChange(validation: t.Validation<T>, value: string | undefined): void
  onSubmit?(value: T): void
  onClear?: () => void
}
```

```typescript
import t as * from 'io-ts';
import { StringInput } from 'strictly-formed-io-ts';

// EX - validate trimmed input is not empty
const NonEmptyStringIoTs = t.refinement(t.string, (str) => str.trim() !== '');
type NonEmptyString = t.TypeOf<typeof NonEmptyString>;

<StringInput<NonEmptyString>
  className="string-input"
  type={NonEmptyStringIoTs}
  value={copyDate}
  onChange={(validation, value) => {
    validation.fold(
      (validationErrors) => console.error(validationErrors),
      // ^^^^^^^^^^^^^^ - T.ValidationError[]
      (validValue) => console.log(validValue)
      // ^^^^^^^^ - NonEmptyString
    )
  }}
  onSubmit={submitString}
>
```


### Install

```bash
npm install strictly-formed
```

### License

[ISC](https://opensource.org/licenses/ISC)

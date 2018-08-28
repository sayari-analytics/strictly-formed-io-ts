import { PureComponent, createElement, Ref } from 'react';
import * as t from 'io-ts'
import { StringInput as WrappedStringInput, StringInputProps } from 'strictly-formed';
import { Omit } from './types';


export type Props<T> = Omit<StringInputProps, 'onChange' | 'onSubmit'> & {
  type: t.Type<T>,
  forwardedRef?: Ref<HTMLInputElement>
  onChange(validation: t.Validation<T>, value: string | undefined): void
  onSubmit?(value: T): void
}


class StringInput<T> extends PureComponent<Props<T>> {
  private onChange = (value: string | undefined) => this.props.onChange(this.props.type.decode(value), value)

  private onSubmit = (value: string | undefined) => {
    if (this.props.onSubmit) {
      this.props.type.decode(value).map(this.props.onSubmit);
    }
  }

  public render() {
    return createElement(
      WrappedStringInput,
      Object.assign({}, this.props, {
        forwardedRef: this.props.forwardedRef,
        onChange: this.onChange,
        onSubmit: this.onSubmit,
        className: this.props.type.decode(this.props.value).fold(
          () => `${this.props.className || ''} invalid`,
          () => this.props.className
        )
      })
    );
  }
}


export default StringInput;

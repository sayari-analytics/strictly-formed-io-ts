import { PureComponent, createElement, Ref } from 'react';
import * as t from 'io-ts'
import { NumberInput as WrappedNumberInput, NumberInputProps } from 'strictly-formed';
import { Omit } from './types';


export type Props<T> = Omit<NumberInputProps, 'onChange' | 'onSubmit'> & {
  type: t.Type<T>,
  forwardedRef?: Ref<HTMLInputElement>
  onChange(validation: t.Validation<T>, value: number | undefined): void
  onSubmit?(value: T): void
}


class NumberInput<T> extends PureComponent<Props<T>> {
  private onChange = (value: number | undefined) => this.props.onChange(this.props.type.decode(value), value)

  private onSubmit = (value: number | undefined) => {
    if (this.props.onSubmit) {
      this.props.type.decode(value).map(this.props.onSubmit);
    }
  }

  public render() {
    return createElement(
      WrappedNumberInput,
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


export default NumberInput;

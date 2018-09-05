import { PureComponent, createElement, Ref } from 'react';
import * as t from 'io-ts'
import { Select as WrappedSelect, SelectProps } from 'strictly-formed';
import { Omit } from './types';


export type Props<Option> = Omit<SelectProps<Option>, 'onChange'> & {
  type: t.Type<Option>,
  forwardedRef?: Ref<HTMLInputElement>
  onChange(validation: t.Validation<Option>, value: Option): void
}


class Select<Option extends string> extends PureComponent<Props<Option>> {
  private onChange = (value: Option) => this.props.onChange(this.props.type.decode(value), value)

  public render() {
    return createElement<SelectProps<Option>>(
      WrappedSelect,
      Object.assign({}, this.props, {
        forwardedRef: this.props.forwardedRef,
        onChange: this.onChange,
        className: this.props.type.decode(this.props.value).fold(
          () => `${this.props.className || ''} invalid`,
          () => this.props.className
        )
      })
    );
  }
}


export default Select;

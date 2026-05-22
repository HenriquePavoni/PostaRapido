import { Directive, ElementRef, forwardRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  formatCurrencyNumber,
  maskCpf,
  maskCurrencyInput,
  maskDate,
  maskPhone,
  MaskType,
  parseCurrency,
  unmaskCpf
} from './mask.util';

@Directive({
  selector: '[appMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaskDirective),
    multi: true
  }]
})
export class MaskDirective implements ControlValueAccessor, OnChanges {

  @Input('appMask') maskType: MaskType;

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};
  private disabled = false;
  private lastModelValue: unknown;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appMask) {
      this.updateView(this.lastModelValue);
    }
  }

  writeValue(value: unknown): void {
    this.lastModelValue = value;
    this.updateView(value);
  }

  private updateView(value: unknown): void {
    if (!this.maskType) {
      return;
    }
    const input = this.el.nativeElement;
    if (value == null || value === '') {
      input.value = '';
      return;
    }
    switch (this.maskType) {
      case 'cpf':
        input.value = maskCpf(String(value));
        break;
      case 'phone':
        input.value = maskPhone(String(value));
        break;
      case 'date':
        input.value = maskDate(String(value));
        break;
      case 'currency':
        input.value = maskCurrencyInput(value as string | number);
        break;
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.el.nativeElement.disabled = isDisabled;
  }

  @HostListener('input')
  onInput(): void {
    if (this.disabled) {
      return;
    }
    const input = this.el.nativeElement;
    const raw = input.value;
    let display = '';
    let model: unknown;

    switch (this.maskType) {
      case 'cpf':
        model = unmaskCpf(raw);
        display = maskCpf(String(model));
        break;
      case 'phone':
        display = maskPhone(raw);
        model = display;
        break;
      case 'date':
        display = maskDate(raw);
        model = display;
        break;
      case 'currency':
        display = maskCurrencyInput(raw);
        model = parseCurrency(display);
        break;
      default:
        return;
    }

    if (input.value !== display) {
      const pos = input.selectionStart;
      input.value = display;
      if (pos != null) {
        input.setSelectionRange(display.length, display.length);
      }
    }
    this.onChange(model);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
    if (this.maskType === 'currency' && this.el.nativeElement.value) {
      const model = parseCurrency(this.el.nativeElement.value);
      if (model != null) {
        this.el.nativeElement.value = formatCurrencyNumber(model);
      }
    }
  }
}

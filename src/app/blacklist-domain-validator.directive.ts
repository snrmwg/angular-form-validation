import { Directive, Input, OnInit } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}
  ]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName
      ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
      : null;
  }
}

@Directive({
  selector: '[appBlacklistDomain]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: BlacklistDomainValidatorDirective, multi: true}
  ]
})
export class BlacklistDomainValidatorDirective implements Validator, OnInit {
  @Input({transform: stringArrayTransform}) appBlacklistDomain!: string[];

  ngOnInit(): void {
    if (!this.appBlacklistDomain?.length) {
      this.appBlacklistDomain = ['facebook.com', 'instagram.com']
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const trimmedValue = control.value?.trim();
    if (trimmedValue) {
      const domain = trimmedValue.split('@')[1];
      if (this.appBlacklistDomain.includes(domain)) {
        return {blacklistDomain: true};
      }
    }
    return null;
  }
}

function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

function stringArrayTransform(value: any) {
  if (typeof value === 'string') {
    if (value.trim() === '') return undefined;
    return value.split(',').map((v: string) => v.trim());
  }
  if (Array.isArray(value)) return value;
  throw new Error("invalid type");
}


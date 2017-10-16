import { FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';
import { ValueChangeListener } from './value-change.listener';
import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
import { CanGenerateAlert, Alert } from '../form-entry/control-alerts/can-generate-alert';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { CanCalculate } from '../form-entry/control-calculators/can-calculate';
import { ExpressionRunner } from '../form-entry/expression-runner/expression-runner';
import * as _ from 'lodash';

export class AfeFormControl extends FormControl implements CanHide, CanDisable, CanCalculate, CanGenerateAlert, ValueChangeListener {
    private _controlRelations: ControlRelations;
    private _valueChangeListener: any;
    private _previousValue;
    public uuid: string;
    public pathFromRoot: string;

    hidden: boolean = false;
    hiders: Hider[];
    alert: string;
    alerts: Alert[];
    calculator: Function;
    disablers: Disabler[];

    private hiderHelper: HiderHelper = new HiderHelper();
    private disablerHelper: DisablerHelper = new DisablerHelper();
    private AlertHelper: AlertHelper = new AlertHelper();
    constructor(formState?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]) {
        super(formState, validator, asyncValidator);
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.disablers = [];
        this.alerts = [];

        this.valueChanges.subscribe((value) => {
            if (Array.isArray(value)) {

                if (Array.isArray(this._previousValue)) {
                    if (!(_.isEqual(this._previousValue.sort(), value.sort()))) {
                        this.fireValueChangeListener(value);
                        this._previousValue = value;
                    }
                }else {
                    this.fireValueChangeListener(value);
                    this._previousValue = value;
                }
            }
          if (this._previousValue !== value) {
            this.fireValueChangeListener(value);
            this._previousValue = value;
          }
        });
    }

    get controlRelations(): ControlRelations {
        return this._controlRelations;
    }

    disable(param?: { onlySelf?: boolean, emitEvent?: boolean }) {
        super.disable(param);
        super.setValue('');
    }

    hide() {
        this.hiderHelper.hideControl(this);
    }

    show() {
        this.hiderHelper.showControl(this);
    }

    setHidingFn(newHider: Hider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }

    setCalculatorFn(newCalculator: Function) {
        this.calculator = newCalculator;
    }

    updateCalculatedValue() {
        if (this.calculator) {
            let _val = this.calculator.call(ExpressionRunner, {});
            this.setValue(_val);
        }
    }

    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }

    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }

    setDisablingFn(newDisabler: Disabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }

    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }

    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }

    setAlertFn(newHider: Alert) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    }

    clearMessageFns() {
        this.AlertHelper.clearAlertsForControl(this);
    }

     updateAlert() {
        this.AlertHelper.evaluateControlAlerts(this);
    }

    addValueChangeListener(func: any) {
      this._valueChangeListener = func;
    }

    fireValueChangeListener(value: any) {
      if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
        this._valueChangeListener(value);
      }
    }
}

import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"
import { Select } from "../ui/Select"

export function DebtForm() {
  const store = useAppStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormGroup 
        label="Loan Type" 
        htmlFor="loanType"
        tooltip="Select the type of loan you are modeling."
      >
        <Select 
          id="loanType" 
          value={store.loanType}
          onChange={e => store.updateState({ loanType: e.target.value as any })}
        >
          <optgroup label="Conventional Fixed">
            <option value="fixed30">30-Year Fixed</option>
            <option value="fixed15">15-Year Fixed</option>
          </optgroup>
          <optgroup label="Adjustable Rate (ARM)">
            <option value="arm10">10/6 ARM</option>
            <option value="arm7">7/1 ARM</option>
          </optgroup>
          <optgroup label="Alternative Financing">
            <option value="io">Interest-Only / Bridge</option>
          </optgroup>
        </Select>
      </FormGroup>

      <FormGroup 
        label="Down Payment (%)" 
        htmlFor="downPaymentPct"
        tooltip="Percentage of purchase price paid out of pocket."
      >
        <Input 
          id="downPaymentPct" 
          type="number" 
          step="0.01"
          value={store.downPaymentPct || ''} 
          onChange={e => store.updateState({ downPaymentPct: Number(e.target.value) })}
        />
      </FormGroup>

      <FormGroup 
        label={store.loanType.startsWith('arm') ? "Initial Rate (%)" : "Interest Rate (%)"} 
        htmlFor="interestRate"
        tooltip="Annual interest rate for the loan."
        className={store.loanType.startsWith('arm') || store.loanType === 'io' ? "" : "md:col-span-2"}
      >
        <Input 
          id="interestRate" 
          type="number" 
          step="0.001"
          value={store.interestRate * 100 || ''} 
          onChange={e => store.updateState({ interestRate: Number(e.target.value) / 100 })}
        />
      </FormGroup>

      {store.loanType.startsWith('arm') && (
        <FormGroup 
          label="Est. Adjusted Rate (%)" 
          htmlFor="adjustedInterestRate"
          tooltip="Conservative estimate for the interest rate after the fixed period ends."
        >
          <Input 
            id="adjustedInterestRate" 
            type="number" 
            step="0.001"
            value={store.adjustedInterestRate * 100 || ''} 
            onChange={e => store.updateState({ adjustedInterestRate: Number(e.target.value) / 100 })}
          />
        </FormGroup>
      )}

      {store.loanType === 'io' && (
        <FormGroup 
          label="I/O Period (Months)" 
          htmlFor="ioPeriodMonths"
          tooltip="Number of months the loan requires interest-only payments."
        >
          <Input 
            id="ioPeriodMonths" 
            type="number" 
            value={store.ioPeriodMonths || ''} 
            onChange={e => store.updateState({ ioPeriodMonths: Number(e.target.value) })}
          />
        </FormGroup>
      )}
    </div>
  )
}

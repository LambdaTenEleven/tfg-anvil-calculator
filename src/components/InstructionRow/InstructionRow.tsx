import ActionSelector from '../ActionSelector';
import { PRIORITIES, type Instruction, type PickableActionId, type PriorityValue } from '../../domain/actions';
import './InstructionRow.css';

interface InstructionRowProps {
  instruction: Instruction;
  index: number;
  onActionChange: (action: PickableActionId | '') => void;
  onPriorityChange: (priority: PriorityValue) => void;
}

export default function InstructionRow({
  instruction,
  index,
  onActionChange,
  onPriorityChange,
}: InstructionRowProps) {
  return (
    <div className="instruction-row">
      <ActionSelector
        label={`Instruction ${index + 1} action`}
        value={instruction.action}
        onChange={onActionChange}
      />

      <label className="priority-field">
        <select
          aria-label={`Instruction ${index + 1} priority`}
          value={instruction.priority}
          onChange={(event) => onPriorityChange(event.target.value as PriorityValue)}
        >
          {PRIORITIES.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
